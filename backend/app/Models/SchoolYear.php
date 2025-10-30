<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolYear extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function classes()
    {
        return $this->hasMany(ClassRoom::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public static function getActive()
    {
        return self::where('is_active', true)->first();
    }
}