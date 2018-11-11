<?php

namespace App\carModels;

use Illuminate\Database\Eloquent\Model;

class Technical extends Model
{
    public $fillable=[
        'year_of_creation',
        'engine',
        'maximum_power',
        'maximum_torque',
        'zero_to_hundred_acceleration',
        'maximum_speed',
        'dimensionWidth',
        'dimensionHeight',
        'dimensionLength',
        'distance_of_two_axis',
    ];
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
