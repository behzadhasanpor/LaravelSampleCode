<?php

namespace App\carModels;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    public $fillable=[
        'name',
        'image_path'
    ];

    public function getRouteKeyName()
    {
        return 'name';
    }

}
