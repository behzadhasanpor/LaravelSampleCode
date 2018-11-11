<?php

namespace App\articleModels;

use Illuminate\Database\Eloquent\Model;

class Article_comment extends Model
{
    public $fillable=[
        'creator',
        'visibility',
        'passage'
    ];
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function article_comment_replays()
    {
        return $this->hasMany(Article_comment_replay::class);
    }
}
