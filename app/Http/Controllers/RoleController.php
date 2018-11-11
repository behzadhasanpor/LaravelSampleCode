<?php

namespace App\Http\Controllers;

use App\appModels\Role;
use App\appModels\User_role_request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{

    public function index()
    {
        $roles=Role::all();
        $user_roles=Auth::user()->roles;
        return view('user.roles',compact('roles','user_roles'));
    }
    public function update(Request $request)
    {
        $validator=$this->role_update_validation($request);
        if($validator===TRUE){
            $user=Auth::user();
            foreach($request['roles'] as $role_id){
                if(User_role_request::where(['requested_id'=>$role_id,'user_id'=>$user->id])->exists()){
                    $role=Role::find($request[$role_id])->get();
                    $massage='نقش'.$role->name.'قبلا برای شما ثبت گردیده است';
                    massage()->info('به روز رسانی نقش',$massage);
                }else{
                    massage()->info('به روز رسانی نقش','درخواست شما با موفقیت ثبت گردید، پس از بررسی توسط مدیران و مطالعه درخواست شما نتیجه در پروفایل شما منعکس خواهد شد.');
                    $user->user_role_requests()->create([
                        'requested_id'=>$role_id,
                        'requested_text'=>$request['requested_text'],
                    ]);
                }
            }
            return back();
        }else{
            return back()->withErrors($validator);
        }
    }
    public function add(User_role_request $user_role_request)
    {
        $user=$user_role_request->user;
        $user->addRole(Role::find($user_role_request->requested_id)->name);
        $user_role_request->delete();
        massage()->info('به روز رسانی نقش','نقش کاربر تایید گردید');
        return back();
    }
    public function abort(User_role_request $user_role_request)
    {
        massage()->info('به روز رسانی نقش','نقش کاربر تایید نگردید');
        $user_role_request->delete();
        return back();
    }
    protected function role_update_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : make regexp for name
            'roles' => 'required|Array',
            'roles.*'=>'Numeric',
            'requested_text'=>'required'
        ]);
        if($validator->fails()){
            return $validator;
        }
        return TRUE;
    }
}
