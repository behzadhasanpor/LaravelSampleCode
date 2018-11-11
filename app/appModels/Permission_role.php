<?php

namespace App\appModels;

use Illuminate\Database\Eloquent\Model;

class Permission_role extends Model
{
    public $fillable=['permission_id','role_id'];
    public $table='permission_role';
    public $timestamps=[];
}
