<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'type_label' => \App\Models\Document::getTypeLabel($this->type),
            'name' => $this->file_name,
            'url' => $this->url,
            'size' => $this->size_formatted,
            'is_verified' => $this->is_verified,
            'uploaded_at' => $this->created_at->toISOString(),
        ];
    }
}