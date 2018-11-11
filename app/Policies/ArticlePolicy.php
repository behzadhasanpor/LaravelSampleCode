<?php

namespace App\Policies;

use App\appModels\User;
use App\articleModels\Article;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArticlePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function index(User $user,Article $article)
    {
        return $this->isRelatedUser($user,$article);
    }
    protected function isRelatedUser($user,$article)
    {
        return $user->id==$article->user_id;
    }
}
