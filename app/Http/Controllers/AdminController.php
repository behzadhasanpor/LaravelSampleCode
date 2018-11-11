<?php

namespace App\Http\Controllers;

use App\appModels\User_role_request;

class AdminController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->middleware('admin');
    }
    public function user_role_requests()
    {
        $requests=User_role_request::all();
        return view('user.admin.user_role_requests',compact('requests'));
    }
}
