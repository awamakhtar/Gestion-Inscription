<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimelineResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->event_type,
            'title' => $this->title,
            'description' => $this->description,
            'date' => $this->formatted_date,
            'user' => $this->user ? $this->user->full_name : null,
        ];
    }
}