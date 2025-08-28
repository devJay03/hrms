<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Amenity extends Model
{
    use HasFactory;
    protected $fillable = [
        'slug',
        'name',
        'description',
    ];

    protected static function booted()
    {
        static::creating(function ($amenity) {
            if (empty($amenity->slug)) {
                $amenity->slug = Str::slug($amenity->name);
            }
        });

        static::updating(function ($amenity) {
            if ($amenity->isDirty('name')) {
                $amenity->slug = Str::slug($amenity->name);
            }
        });
    }
}
