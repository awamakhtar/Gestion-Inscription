<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'registration_number' => $this->registration_number,
            'student_name' => $this->student->full_name,
            'student' => new StudentResource($this->whenLoaded('student')),
            'level' => $this->level->name,
            'level_code' => $this->level->code,
            'status' => $this->status,
            'admin_message' => $this->admin_message,
            'submitted_at' => $this->submitted_at->toISOString(),
            'reviewed_at' => $this->reviewed_at?->toISOString(),
            'class' => $this->class ? [
                'id' => $this->class->id,
                'name' => $this->class->name,
            ] : null,
            'documents' => DocumentResource::collection($this->whenLoaded('documents')),
            'timeline' => TimelineResource::collection($this->whenLoaded('timeline')),
            'missing_documents' => $this->when(
                $this->status === 'incomplete',
                $this->getMissingDocuments()
            ),
        ];
    }

    protected function getMissingDocuments()
    {
        $requiredDocs = ['birth_certificate', 'photo'];
        $uploadedDocs = $this->documents->pluck('type')->toArray();
        $missing = array_diff($requiredDocs, $uploadedDocs);

        return array_map(function($type) {
            return \App\Models\Document::getTypeLabel($type);
        }, $missing);
    }
}