<?php

namespace App\appModels;

use App\articleModels\Article;
use App\articleModels\Article_comment_replay;
use App\carModels\Car;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'first_name','last_name', 'email','tel','address', 'password','description',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function cars()
    {
        return $this->hasMany(Car::class);
    }

    public function addRole($role_name)
    {
        DB::table('role_user')->insert([
            'role_id'=>Role::whereName($role_name)->first()->id,
            'user_id'=>$this->id
        ]);
    }

    public function user_role_requests()
    {
        return $this->hasMany(User_role_request::class);
    }

    public function hasPermission($permission)
    {
        if (count($this->roles) > 0){
            foreach ($this->roles as $r) {
                if($r->hasPermission($permission)){
                    return TRUE;
                }
                continue;
            }
        }
        return false;
    }

    public function hasRole($role,$using_role_name=FALSE)
    {
        if(!$using_role_name)
            return $this->roles->contains('name',$role->name);
        return $this->roles->contains('name',$role);
    }

    public function isAdmin()
    {
        return $this->hasRole('admin',TRUE);
    }

    public function isWriter()
    {
        return $this->hasRole('writer',TRUE);
    }

    public function isScientist()
    {
        return $this->hasRole('scientist',TRUE);
    }

    public function Article_comment_replays()
    {
        return $this->hasMany(Article_comment_replay::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
    public function votes()
    {
        return $this->morphMany('App\appModels\Vote', 'voteable');
    }
    public function isVotedMe($ip)
    {
        return $this->votes()->get()->contains('ip',$ip);
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
