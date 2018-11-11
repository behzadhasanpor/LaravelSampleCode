<?php

namespace App\Http\Controllers;

use App\AppDirectory\Traits\CarAssignments;
use App\carModels\Brand;
use App\carModels\Car;
use App\Http\Requests\CarUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    use CarAssignments;

    protected $mismatch_error_massage='عدم تطابق اطلاعات ورودی با پایگاه داده.';

    public $imageBaseDir='images/cars/';

    public function __construct()
    {
        parent::__construct();
        $this->middleware(['auth','writer']);
        $this->middleware('can:index,car',[
            'except'=>[
                'cars',
                'create',
                'ajax_cars',
            ]
        ]);
    }
    public function getCar_fields()
    {
        return [
            $this->car_fields[0]=>$this->mainAttributes,
            $this->car_fields[1]=>$this->pricesAttributes,
            $this->car_fields[2]=>$this->abilitiesAttributes,
            $this->car_fields[3]=>$this->technicalAttributes,
            $this->car_fields[4]=>$this->oil_consumptionsAttributes,

        ];
    }
    public function cars()
    {
        return view('user.writer.cars.cars');
    }
    public function ajax_cars(Request $request)
    {
        if($this->ajax_cars_validation($request)){
            $cars=Auth::user()->cars()->where("name","LIKE",'%'.request()->name.'%')->get();
            return response()->json($cars);
        }
        return response()->json('massage','validation error');
    }
    public function edit(Car $car,$name)
    {
        $this->check_car_match($car,$name);
        $car_fields=$this->getCar_fields();
        $brands=Brand::all();
        return view('user.writer.cars.edit_car',compact('car_fields','car','brands'));
    }
    public function update(CarUpdateRequest $request,Car $car)
    {
        $res=$this->prepare_carUpdate_requested_array($request);
        $car->brand_id=$request->brand_id;
        $car->save();
        $car->update($res[$this->car_fields[0]]);
        $car->oil_consumption()->update($res[$this->car_fields[4]]);
        $car->technical()->update($res[$this->car_fields[3]]);
        $car->price()->update($res[$this->car_fields[1]]);
        $car->ability()->update($res[$this->car_fields[2]]);
        massage()->success('به روز رسانی اطلاعات','اطلاعات اتومبیل مورد نظر با موفقیت به روز رسانی شد.');
        return redirect('user/writer/cars');
    }
    public function create()
    {
        $res=$this->prepare_carFields_array();
        // TODO : make cars_filed array more readable
        $car=Auth::user()->cars()->create(array_merge($res[$this->car_fields[0]][''],['brand_id'=>1]));
        $car->oil_consumption()->create($res[$this->car_fields[4]]['']);
        $car->technical()->create($res[$this->car_fields[3]]['']);
        $car->price()->create($res[$this->car_fields[1]]['']);
        $car->ability()->create($res[$this->car_fields[2]]['']);
        massage()->success('اتومبیل جدید با موفقیت اضافه گردید','جهت ویرایش اطلاعات اتومبیل ایجاد شده لینک زیر عکس را کلیک نمایید. ');
        return redirect('user/writer/cars');
    }
    public function delete(Car $car,$name)
    {
        $this->check_car_match($car,$name);
        $car->delete();
    }
    public function add_image(Request $request,Car $car,$name)
    {
        if($this->add_image_validation($request)){
            $this->check_car_match($car,$name);
            $car_img=$request->file;
            $file_name=time().'-'.$car_img->getClientOriginalName();
            $image_path=$this->imageBaseDir.$file_name;
            if($car->image_path!=NULL){
                FILE::delete($car->image_path);
            }
            $car->image_path=$image_path;
            $car->save();
            $car_img->move($this->imageBaseDir,$file_name);
            massage()->success('ذخیره تصویر','تصویر جدید با موفقیت ثبت گردید');
        }else{
            massage()->error('ذخیره تصویر','تصویر به دلیل خطای معتبرسازی دریافت نگردید');
        }
    }
    protected function add_image_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : make regexp for name
            'file' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048'
        ]);
        if($validator->fails()){
            return FALSE;
        }
        return TRUE;
    }
    /**
     * this function just prepare predefined array for car fields and placed in
     * CarAssignment Trait
     * @return array
     */
    protected function prepare_carFields_array()
    {
        $car_fields=$this->car_fields;
        $res=[];
        foreach ($this->getCar_fields() as $request_name => $request_value){
            foreach ($car_fields as $sub_table_name){
                if (strpos($request_name,$sub_table_name)!==FALSE){
                    $exp=explode($sub_table_name,$request_name);
                    $res[$sub_table_name][$exp[1]]=$request_value;
                }
            }
        }
        return $res;
    }
    /**
     * this function just prepare predefined array for car fields and placed in
     * CarAssignment Trait
     * @return array
     */
    protected function prepare_carUpdate_requested_array($request)
    {
        $car_fields=$this->car_fields;
        $res=[];
        foreach ($request->all() as $request_name => $request_value){
            foreach ($car_fields as $sub_table_name){
                if (strpos($request_name,$sub_table_name)!==FALSE){
                    $exp=explode($sub_table_name,$request_name);
                    $res[$sub_table_name][$exp[1]]=$request_value;
                }
            }
        }
        return $res;
    }
    protected function check_car_match($car,$name)
    {
        if($car->name!=$name){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function ajax_cars_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : make regexp for name
            'name'=>'max:50'
        ]);
        if($validator->fails()){
            return FALSE;
        }
        return TRUE;
    }
}
