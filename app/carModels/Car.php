<?php

namespace App\carModels;

use App\appModels\User;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    public $fillable=[
        'name',
        'image_path',
        'brand',
        'number_of_Cylinder',
        'volume_of_engine',
        'price',
    ];
    public function technical()
    {
        return $this->hasOne(Technical::class);
    }
    public function price()
    {
        return $this->hasOne(Price::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function oil_consumption()
    {
        return $this->hasOne(Oil_consumption::class);
    }
    public function ability()
    {
        return $this->hasOne(Ability::class);
    }
    public function visits()
    {
        return $this->morphMany('App\appModels\Visit', 'visitable');
    }
    public function isVisitedMe($ip)
    {
        return $this->visits()->get()->contains('ip',$ip);
    }
    public function votes()
    {
        return $this->morphMany('App\appModels\Vote', 'voteable');
    }
    public function isVotedMe($ip)
    {
        return $this->votes()->get()->contains('ip',$ip);
    }

    public static function getAllBrandOfId($brand_id)
    {
        return Car::where('brand_id',request()->$brand_id)->get()->all();
    }
}
