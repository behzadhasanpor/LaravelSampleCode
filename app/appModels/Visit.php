<?php

namespace App\appModels;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    public $fillable=['ip'];

    public function visitable()
    {
        return $this->morphTo();
    }
}
