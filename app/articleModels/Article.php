<?php

namespace App\articleModels;


use App\appModels\Category;
use App\appModels\Tag;
use App\appModels\User;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public $fillable=[
        'title',
        'passage'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function articleImages()
    {
        return $this->hasMany(Article_image::class);
    }

    public function article_comments()
    {
        return $this->hasMany(Article_comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
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
}
