<?php

namespace App\Http\Controllers;

use App\appModels\User;
use App\articleModels\Article;
use App\carModels\Car;
use Illuminate\Support\Facades\Validator;

class VoteController extends Controller
{
    protected $mismatch_error_massage='عدم تطابق اطلاعات ورودی با پایگاه داده.';

    public function update_car(Car $car,$name)
    {
        if($this->vote_validation(request()->all())){
            $this->check_car_match($car,$name);
            $current_vote=request()->vote;
            if($current_vote==1){
                vote()->car($car)->un_set();
                echo 'f2e';
            }elseif($current_vote==0){
                vote()->car($car)->set();
                echo 'e2f';
            }
        }
    }
    public function update_article(Article $article,$title)
    {
        if($this->vote_validation(request()->all())) {
            $this->check_article_match($article, $title);
            $current_vote = request()->vote;
            if ($current_vote == 1) {
                vote()->article($article)->un_set();
                echo 'f2e';
            } elseif ($current_vote == 0) {
                vote()->article($article)->set();
                echo 'e2f';
            }
        }
    }
    public function update_user(User $user,$first_name)
    {
        if($this->vote_validation(request()->all())) {
            $this->check_user_match($user, $first_name);
            $current_vote = request()->vote;
            if ($current_vote == 1) {
                vote()->user($user)->un_set();
                echo 'f2e';
            } elseif ($current_vote == 0) {
                vote()->user($user)->set();
                echo 'e2f';
            }
        }
    }
    protected function check_car_match($car,$name)
    {
        if($car->name!=$name){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function check_article_match($article,$title)
    {
        if($article->title!=$title){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function check_user_match($user,$first_name)
    {
        if($user->first_name!=$first_name){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function vote_validation($request)
    {
        $validator = Validator::make($request, [
            // TODO : make regexp for name
            'vote' => 'Numeric',
        ]);
        if($validator->fails()){
            return FALSE;
        }
        return TRUE;
    }
}
