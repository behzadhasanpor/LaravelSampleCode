<?php

namespace App\carModels;

use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
    protected $fillable = [
        'brakes',
        'air_bag',
        'audio_system',
        'other_facilities',
    ];
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
