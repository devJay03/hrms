<?php
namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Amenity extends Model
{
    use HasFactory, Searchable;
    protected $fillable = [
        'slug',
        'name',
        'description',
        'is_available',
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
    protected function getSearchableConfig()
    {
        return ['fields' => ['name', 'description', 'slug']];
    }

    public function rooms()
    {
        return $this->hasMany(RoomAmenity::class);
    }
}
