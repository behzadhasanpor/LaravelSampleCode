<?php

namespace App\articleModels;

use Illuminate\Database\Eloquent\Model;

class Article_image extends Model
{
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
