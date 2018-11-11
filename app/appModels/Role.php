<?php

namespace App\appModels;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public $fillable=['label','name'];
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    public function hasPermission(Permission $permission)
    {
        return $this->permissions()->contains('name',$permission->name);
    }
}
