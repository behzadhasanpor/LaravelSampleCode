<?php

namespace App\carModels;

use Illuminate\Database\Eloquent\Model;

class Price_chart extends Model
{
    public function price()
    {
        return $this->belongsTo(Price::class);
    }
}
