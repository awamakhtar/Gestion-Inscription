<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_number',
        'student_id',
        'level_id',
        'school_year_id',
        'class_id',
        'status',
        'admin_message',
        'submitted_at',
        'reviewed_at',
        'reviewed_by',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            if (empty($registration->registration_number)) {
                $registration->registration_number = self::generateRegistrationNumber();
            }
        });

        static::created(function ($registration) {
            // Créer l'événement initial dans la timeline
            $registration->timeline()->create([
                'event_type' => 'submitted',
                'title' => 'Dossier soumis',
                'description' => 'Votre demande d\'inscription a été reçue avec succès.',
            ]);
        });
    }

    public static function generateRegistrationNumber()
    {
        $year = date('Y');
        $lastRegistration = self::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        $number = $lastRegistration ? ((int) substr($lastRegistration->registration_number, -4)) + 1 : 1;

        return sprintf('INS%s-%04d', $year, $number);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function class()
    {
        return $this->belongsTo(ClassRoom::class, 'class_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function timeline()
    {
        return $this->hasMany(RegistrationTimeline::class)->orderBy('created_at', 'desc');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function approve($classId, $adminMessage = null)
    {
        $this->update([
            'status' => 'approved',
            'class_id' => $classId,
            'admin_message' => $adminMessage,
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        $this->timeline()->create([
            'event_type' => 'approved',
            'title' => 'Inscription approuvée',
            'description' => $adminMessage ?? 'Votre inscription a été approuvée avec succès.',
            'user_id' => auth()->id(),
        ]);

        // Incrémenter l'effectif de la classe
        if ($this->class) {
            $this->class->incrementEnrollment();
        }
    }

    public function reject($adminMessage)
    {
        $this->update([
            'status' => 'rejected',
            'admin_message' => $adminMessage,
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        $this->timeline()->create([
            'event_type' => 'rejected',
            'title' => 'Inscription rejetée',
            'description' => $adminMessage,
            'user_id' => auth()->id(),
        ]);
    }

    public function markIncomplete($adminMessage)
    {
        $this->update([
            'status' => 'incomplete',
            'admin_message' => $adminMessage,
        ]);

        $this->timeline()->create([
            'event_type' => 'incomplete',
            'title' => 'Documents incomplets',
            'description' => $adminMessage,
            'user_id' => auth()->id(),
        ]);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeIncomplete($query)
    {
        return $query->where('status', 'incomplete');
    }
}