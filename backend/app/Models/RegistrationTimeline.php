<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationTimeline extends Model
{
    use HasFactory;

    protected $table = 'registration_timeline';

    protected $fillable = [
        'registration_id',
        'event_type',
        'title',
        'description',
        'user_id',
    ];

    protected $appends = ['formatted_date'];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFormattedDateAttribute()
    {
        return $this->created_at->locale('fr')->isoFormat('D MMMM YYYY, HH:mm');
    }
}