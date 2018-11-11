<?php

namespace App\Providers;

use App\appModels\Image;
use App\appModels\Permission;
use App\appModels\Role;
use App\articleModels\Article;
use App\carModels\Car;
use App\Policies\ArticlePolicy;
use App\Policies\CarPolicy;
use App\Policies\ImagePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [

        Article::class => ArticlePolicy::class,
        Car::class=>CarPolicy::class,
        Image::class=>ImagePolicy::class,

    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        foreach($this->getPermissions() as $permission){
            Gate::define($permission->name,function ($user) use($permission){
                return $user->hasPermission($permission);
            });
        }
        foreach($this->getRoles() as $role){
            Gate::define($role->name,function ($user) use($role){
                return $user->hasRole($role);
            });
        }

    }
    public function getPermissions(){
        return Permission::with('roles')->get();
    }

    public function getRoles()
    {
        return Role::all();
    }
}
