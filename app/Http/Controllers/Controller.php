<?php

namespace App\Http\Controllers;

use App\appModels\Category;
use App\carModels\Car;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Route;

class Controller extends BaseController
{
    public function __construct()
    {
        if(Route::getCurrentRoute()->uri!=FALSE){
            view()->share('current_route_uri',Route::getCurrentRoute()->uri);
            view()->share('current_route_name',Route::currentRouteName());
            view()->share('categories',Category::all());
            $car_limit=4;
            view()->share('car_limit',$car_limit);
            view()->share('articles_limit',4);
            view()->share('cars',Car::orderBy('updated_at','ASCE')->where('image_path',"<>",NULL)->limit($car_limit)->get()->all());
            view()->share('categories',Category::all());
        }
    }
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
