<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'level_id',
        'school_year_id',
        'name',
        'capacity',
        'current_enrollment',
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class, 'class_id');
    }

    public function hasSpace()
    {
        return $this->current_enrollment < $this->capacity;
    }

    public function incrementEnrollment()
    {
        $this->increment('current_enrollment');
    }

    public function decrementEnrollment()
    {
        $this->decrement('current_enrollment');
    }
}