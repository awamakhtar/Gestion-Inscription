<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;

class DocumentPolicy
{
    public function view(User $user, Document $document): bool
    {
        return $user->id === $document->registration->student->user_id || $user->isAdmin();
    }

    public function delete(User $user, Document $document): bool
    {
        return $user->id === $document->registration->student->user_id || $user->isAdmin();
    }
}