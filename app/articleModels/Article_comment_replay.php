<?php

namespace App\articleModels;

use App\appModels\User;
use Illuminate\Database\Eloquent\Model;

class Article_comment_replay extends Model
{
    public $fillable=[
        'passage'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function article_comment()
    {
        return $this->belongsTo(Article_comment::class);
    }
}
