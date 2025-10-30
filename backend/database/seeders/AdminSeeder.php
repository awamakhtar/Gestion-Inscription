<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Système',
            'email' => 'admin@ecole.sn',
            'password' => Hash::make('password'),
            'phone' => '+221 XX XXX XX XX',
            'address' => 'Dakar, Sénégal',
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}