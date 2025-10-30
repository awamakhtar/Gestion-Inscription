<?php

namespace App\Policies;

use App\Models\Registration;
use App\Models\User;

class RegistrationPolicy
{
    public function view(User $user, Registration $registration): bool
    {
        return $user->id === $registration->student->user_id || $user->isAdmin();
    }

    public function update(User $user, Registration $registration): bool
    {
        return $user->id === $registration->student->user_id || $user->isAdmin();
    }

    public function delete(User $user, Registration $registration): bool
    {
        return $user->isAdmin();
    }
}