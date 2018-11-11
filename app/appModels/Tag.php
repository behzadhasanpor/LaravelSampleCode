<?php

namespace App\appModels;

use App\articleModels\Article;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public $fillable=[
        'name'
    ];

    public function images()
    {
        return $this->belongsToMany(Image::class);
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
    public function visits()
    {
        return $this->morphMany('App\appModels\Visit', 'visitable');
    }
    public function isVisitedMe($ip)
    {
        return $this->visits()->get()->contains('ip',$ip);
    }

}
