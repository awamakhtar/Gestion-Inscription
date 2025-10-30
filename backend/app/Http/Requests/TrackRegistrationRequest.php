<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrackRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'registration_number' => ['required', 'string'],
            'email' => ['required', 'email'],
        ];
    }

    public function messages(): array
    {
        return [
            'registration_number.required' => 'Le numéro de dossier est requis',
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email doit être valide',
        ];
    }
}