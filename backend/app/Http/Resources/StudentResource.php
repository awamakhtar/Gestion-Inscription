<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'date_of_birth' => $this->date_of_birth->format('Y-m-d'),
            'place_of_birth' => $this->place_of_birth,
            'gender' => $this->gender,
            'age' => $this->age,
            'previous_school' => $this->previous_school,
            'parent' => new UserResource($this->whenLoaded('user')),
        ];
    }
}