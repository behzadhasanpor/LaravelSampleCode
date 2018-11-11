<?php

namespace App\Http\Controllers;

use App\carModels\Brand;
use App\carModels\Car;

class BrandController extends Controller
{

    public function brands()
    {
        $brands=Brand::all();
        return view('app.brands.brands',compact('brands'));
    }
    public function index(Brand $brand)
    {
        $cars=Car::where('brand_id',$brand->id)->get();
        return view('app.brands.index',compact('brand','cars'));
    }
    public function ajax()
    {
        $cars=Car::where(['brand_id'=>request()->current_brand])->get();
        return response()->json($cars);
    }
}
