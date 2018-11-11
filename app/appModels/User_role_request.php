<?php

namespace App\appModels;

use Illuminate\Database\Eloquent\Model;

class User_role_request extends Model
{
    protected $fillable=[
        'requested_id','requested_text'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
