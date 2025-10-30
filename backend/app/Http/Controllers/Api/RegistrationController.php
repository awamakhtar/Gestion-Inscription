<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegistrationRequest;
use App\Http\Requests\TrackRegistrationRequest;
use App\Http\Resources\RegistrationResource;
use App\Models\Document;
use App\Models\Level;
use App\Models\Registration;
use App\Models\SchoolYear;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function index(Request $request)
    {
        $registrations = $request->user()
            ->students()
            ->with(['registrations.level', 'registrations.documents', 'registrations.timeline'])
            ->get()
            ->pluck('registrations')
            ->flatten();

        return RegistrationResource::collection($registrations);
    }

    public function store(StoreRegistrationRequest $request)
    {
        try {
            DB::beginTransaction();

            // 1. Créer ou récupérer l'utilisateur parent
            $parent = User::firstOrCreate(
                ['email' => $request->input('parent.email')],
                [
                    'first_name' => $request->input('parent.parent_first_name'),
                    'last_name' => $request->input('parent.parent_last_name'),
                    'password' => Hash::make('password123'), // Mot de passe temporaire
                    'phone' => $request->input('parent.phone'),
                    'address' => $request->input('parent.address'),
                    'profession' => $request->input('parent.profession'),
                    'role' => 'parent',
                ]
            );

            // 2. Créer l'élève
            $student = $parent->students()->create([
                'first_name' => $request->input('student.first_name'),
                'last_name' => $request->input('student.last_name'),
                'date_of_birth' => $request->input('student.date_of_birth'),
                'place_of_birth' => $request->input('student.place_of_birth'),
                'gender' => $request->input('student.gender'),
                'previous_school' => $request->input('student.previous_school'),
            ]);

            // 3. Récupérer le niveau et l'année scolaire
            $level = Level::where('code', $request->input('student.level'))->firstOrFail();
            $schoolYear = SchoolYear::getActive();

            if (!$schoolYear) {
                throw new \Exception('Aucune année scolaire active');
            }

            // 4. Créer l'inscription
            $registration = $student->registrations()->create([
                'level_id' => $level->id,
                'school_year_id' => $schoolYear->id,
                'status' => 'pending',
                'submitted_at' => now(),
            ]);

            // 5. Uploader les documents
            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $type => $file) {
                    if ($file) {
                        $path = $file->store('documents/' . $registration->id, 'public');

                        $registration->documents()->create([
                            'type' => $type,
                            'file_name' => $file->getClientOriginalName(),
                            'file_path' => $path,
                            'mime_type' => $file->getMimeType(),
                            'file_size' => $file->getSize(),
                        ]);
                    }
                }
            }

            DB::commit();

            // Charger les relations pour la réponse
            $registration->load(['student', 'level', 'documents', 'timeline']);

            return response()->json([
                'message' => 'Inscription soumise avec succès',
                'registration' => new RegistrationResource($registration),
                'registration_number' => $registration->registration_number,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Erreur lors de l\'inscription',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(Registration $registration)
    {
        $this->authorize('view', $registration);

        $registration->load(['student', 'level', 'class', 'documents', 'timeline']);

        return new RegistrationResource($registration);
    }

    public function track(TrackRegistrationRequest $request)
    {
        $registration = Registration::where('registration_number', $request->registration_number)
            ->whereHas('student.user', function ($query) use ($request) {
                $query->where('email', $request->email);
            })
            ->with(['student', 'level', 'class', 'documents', 'timeline'])
            ->first();

        if (!$registration) {
            return response()->json([
                'message' => 'Aucune inscription trouvée avec ces informations',
            ], 404);
        }

        return new RegistrationResource($registration);
    }

    public function uploadDocument(Request $request, Registration $registration)
    {
        $this->authorize('update', $registration);

        $request->validate([
            'type' => ['required', 'in:birth_certificate,photo,previous_report,health_certificate,parent_id'],
            'file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
        ]);

        $file = $request->file('file');
        $path = $file->store('documents/' . $registration->id, 'public');

        $document = $registration->documents()->create([
            'type' => $request->type,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);

        return response()->json([
            'message' => 'Document ajouté avec succès',
            'document' => new \App\Http\Resources\DocumentResource($document),
        ]);
    }
}