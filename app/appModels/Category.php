<?php

namespace App\appModels;

use App\articleModels\Article;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $fillable=[
        'name',
        'description'
    ];
    public function images()
    {
        return $this->belongsToMany(Image::class);
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }


}
