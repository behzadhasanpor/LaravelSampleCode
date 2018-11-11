<?php

namespace App\appModels;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    public $fillable=['ip'];

    public function voteable()
    {
        return $this->morphTo();
    }
}
