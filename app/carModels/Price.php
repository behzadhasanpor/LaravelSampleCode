<?php

namespace App\carModels;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    public $fillable=[
        'fresh_car_price',
        'worked_car_price',
    ];
    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function price_charts()
    {
        return $this->hasMany(Price_chart::class);
    }
}
