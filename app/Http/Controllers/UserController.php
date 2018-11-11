<?php

namespace App\Http\Controllers;

use App\appModels\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    protected $mismatch_error_massage='عدم تطابق اطلاعات ورودی با پایگاه داده.';
    private $imageBaseDir='images/users/';

    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth',['except'=>[
            'show'
        ]]);
    }
    public function index()
    {
        $me=Auth::user();
        return view('user.profile.index',compact('me'));
    }
    public function update_image(Request $request,$name)
    {
        $validator=$this->update_image_validation($request);
        if ($validator===TRUE){
            $user=Auth::user();
            $this->check_user_match($user,$name);
            $car_img=$request->file;
            $file_name=time().'-'.$car_img->getClientOriginalName();
            $image_path=$this->imageBaseDir.$file_name;
            if($user->image_path!=NULL){
                FILE::delete($user->image_path);
            }
            $user->image_path=$image_path;
            $user->save();
            $car_img->move($this->imageBaseDir,$file_name);
        }else{
            // TODO : synchronise with dropzone js funtion
        }
    }
    public function update(Request $request)
    {
        $validator=$this->update_user_validation($request);
        if($validator===TRUE){
            Auth::user()->update($request->all());
            massage()->success('به روز رسانی اطلاعات','اطلاعات شخصی شما با موفقیت به روز رسانی گردید');
            return redirect('user/profile');
        }else{
            return redirect('user/profile')->withErrors($validator);
        }
    }
    public function show(User $user,$first_name)
    {
        $this->check_user_match($user,$first_name);
        $my_cars_limit=10;
        $my_articles_limit=10;
        $my_cars=$user->cars;
        $my_articles=$user->articles;
        visit()->user($user)->set();
        return view('app.users.show',compact('user','my_cars','my_cars_limit','my_articles','my_articles_limit'));
    }
    protected function check_user_match($user,$first_name)
    {
        if($user->first_name!=$first_name){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function update_image_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : make regexp for name
            'file'=> 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
        ]);
        if($validator->fails()){
            return $validator;
        }
        return TRUE;
    }
    protected function update_user_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : make regexp for name
            'first_name'=> 'required',
            'last_name'=> 'required',
        ]);
        if($validator->fails()){
            return $validator;
        }
        return TRUE;
    }


}
