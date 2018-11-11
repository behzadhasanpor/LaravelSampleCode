<?php

namespace App\Policies;

use App\appModels\Image;
use App\appModels\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ImagePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    public function index(User $user,Image $image)
    {
        return $this->isRelatedUser($user,$image);
    }
    public function isRelatedUser($user,$image)
    {
        return $user->id==$image->user_id;
    }
}
