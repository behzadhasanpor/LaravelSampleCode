<?php

namespace App\Policies;

use App\appModels\User;
use App\carModels\Car;
use Illuminate\Auth\Access\HandlesAuthorization;

class CarPolicy
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
    public function index(User $user,Car $car)
    {
        return $this->isRelatedUser($user,$car);
    }
    public function isRelatedUser($user,$car)
    {
        return $user->id==$car->user_id;
    }
}
