<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'type',
        'file_name',
        'file_path',
        'mime_type',
        'file_size',
        'is_verified',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
    ];

    protected $appends = ['url', 'size_formatted'];

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function getUrlAttribute()
    {
        return Storage::url($this->file_path);
    }

    public function getSizeFormattedAttribute()
    {
        $size = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;

        while ($size >= 1024 && $i < count($units) - 1) {
            $size /= 1024;
            $i++;
        }

        return round($size, 2) . ' ' . $units[$i];
    }

    public static function getTypeLabel($type)
    {
        $labels = [
            'birth_certificate' => 'Acte de naissance',
            'photo' => 'Photo d\'identité',
            'previous_report' => 'Bulletin de l\'année précédente',
            'health_certificate' => 'Certificat médical',
            'parent_id' => 'Pièce d\'identité du parent',
        ];

        return $labels[$type] ?? $type;
    }

    public function verify()
    {
        $this->update(['is_verified' => true]);
    }

    public function unverify()
    {
        $this->update(['is_verified' => false]);
    }
}