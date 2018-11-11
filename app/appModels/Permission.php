<?php

namespace App\appModels;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    public $fillable=['label','name'];
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
