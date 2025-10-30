<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registration_timeline', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->string('event_type'); // submitted, pending, approved, rejected, etc.
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('user_id')->nullable()->constrained(); // Qui a fait l'action
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_timeline');
    }
};