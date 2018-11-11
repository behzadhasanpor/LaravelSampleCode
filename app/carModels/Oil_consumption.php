<?php

namespace App\carModels;

use Illuminate\Database\Eloquent\Model;

class Oil_consumption extends Model
{
    public $fillable=[
        'type_of_oil',
        'inside_town_oil_consumption',
        'outside_town_oil_consumption',
        'hybrid_oil_consumption',
        'tank_volume',
        'pollution_standard',
        'co2_production_level',
        'security_standard',
    ];
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
