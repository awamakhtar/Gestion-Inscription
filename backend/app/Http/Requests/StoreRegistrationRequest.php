<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Student data
            'student.first_name' => ['required', 'string', 'max:255'],
            'student.last_name' => ['required', 'string', 'max:255'],
            'student.date_of_birth' => ['required', 'date', 'before:today'],
            'student.place_of_birth' => ['required', 'string', 'max:255'],
            'student.gender' => ['required', 'in:M,F'],
            'student.level' => ['required', 'exists:levels,code'],
            'student.previous_school' => ['nullable', 'string', 'max:255'],

            // Parent data
            'parent.parent_first_name' => ['required', 'string', 'max:255'],
            'parent.parent_last_name' => ['required', 'string', 'max:255'],
            'parent.email' => ['required', 'email'],
            'parent.phone' => ['required', 'string'],
            'parent.address' => ['required', 'string'],
            'parent.profession' => ['nullable', 'string', 'max:255'],

            // Documents
            'documents.birth_certificate' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
            'documents.photo' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:2048'],
            'documents.previous_report' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
            'documents.health_certificate' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
            'documents.parent_id' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'student.first_name.required' => 'Le prénom de l\'élève est requis',
            'student.last_name.required' => 'Le nom de l\'élève est requis',
            'student.date_of_birth.required' => 'La date de naissance est requise',
            'student.date_of_birth.before' => 'La date de naissance doit être antérieure à aujourd\'hui',
            'student.place_of_birth.required' => 'Le lieu de naissance est requis',
            'student.gender.required' => 'Le sexe est requis',
            'student.level.required' => 'Le niveau est requis',
            'student.level.exists' => 'Le niveau sélectionné n\'existe pas',

            'parent.parent_first_name.required' => 'Le prénom du parent est requis',
            'parent.parent_last_name.required' => 'Le nom du parent est requis',
            'parent.email.required' => 'L\'email du parent est requis',
            'parent.email.email' => 'L\'email doit être valide',
            'parent.phone.required' => 'Le téléphone est requis',
            'parent.address.required' => 'L\'adresse est requise',

            'documents.birth_certificate.required' => 'L\'acte de naissance est requis',
            'documents.photo.required' => 'La photo d\'identité est requise',
            'documents.*.mimes' => 'Le format du fichier n\'est pas accepté',
            'documents.*.max' => 'Le fichier est trop volumineux (max 5 MB)',
        ];
    }
}