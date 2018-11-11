<?php

namespace App\Http\Controllers;

use App\appModels\Category;
use App\appModels\Image;
use App\appModels\Tag;
use App\articleModels\Article;
use App\carModels\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    protected $mismatch_error_massage='عدم تطابق اطلاعات ورودی با پایگاه داده.';
    public $imageBaseDir='images/orgImages/';

    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth');
        $this->middleware('can:index,image',
            [
                'except'=>
                    [
                        'index',
                        'create',
                        'get_collection',
                        'ajax_images'
                    ],
            ]);
    }
    public function index()
    {
        $images=Auth::user()->images;
        $categories=Category::all();
        $tags=Tag::all();
        $articles=Article::orderBy('created_at')->get()->all();
        $cars=Car::all();
        return view('user.photographer.index',compact('images','categories','tags','articles','cars'));
    }
    public function ajax_images()
    {
        if ($this->ajax_images_validation(request()->all())){
            $images=Auth::user()->images()->where("name","LIKE",'%'.request()->name.'%')->paginate(20);
            return response()->json($images);
        }else{
            // TODO : add if statement to correspond javascript function to reply this
        }
    }
    public function create(Request $request)
    {
        $validator=$this->create_image_validation($request);
        if ($validator===TRUE){
            foreach ($request->file('image') as $file){
                $this->createImage($file,$request);
            }
            massage()->success('ایجاد تصویر جدید','تصویر جدید ایجاد گردید');
            return redirect('user/photographer');
        }else{
            massage()->error('ایجاد تصویر جدید','خطا ی معتبر سازی در ایجاد تصویر');
            return redirect('user/photographer')->withErrors($validator);
        }
    }
    private function createImage($file,$request){
        $img=$file;
        $file_name=time().'-'.$img->getClientOriginalName();
        $image_path=$this->imageBaseDir.$file_name;
        $img->move($this->imageBaseDir,$file_name);

        $image=Auth::user()->images()->create([
            'name'=>$request->name,
            'path'=>$image_path,
        ]);

        if($request->article!='none'){
            $image->article_id=$request->article;
        }
        if($request->car!='none'){
            $image->car_id=$request->car;
        }
        $image->save();
        $image->tags()->sync($request->tags);
        $image->categories()->sync($request->category);

    }
    public function get_collection(Request $request)
    {
        $validator=$this->get_collection_validation($request);
        if ($validator===TRUE){
            $search=$request->name;
            echo json_encode(Image::where("name","LIKE",'%'.$search.'%')->get());
        }else{
            // TODO : synchronise with js correspond function
//            echo json_encode();
        }
    }
    public function delete(Image $image,$name)
    {
        $this->check_image_match($image,$name);
        $image->delete();
    }
    protected function check_image_match($image,$name)
    {
        if($image->name!=$name){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function ajax_images_validation($request)
    {
        $validator = Validator::make($request, [
            // TODO : complete validation rules and make regex
            'name' => 'max:30',
        ]);
        if($validator->fails()){
            return FALSE;
        }
        return TRUE;
    }
    protected function create_image_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : make regexp for name
            'image' => 'Array',
            'image.*'=> 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
            'name'=>'required'
        ]);
        if($validator->fails()){
            return $validator;
        }
        return TRUE;
    }
    protected function get_collection_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : make regexp for name
            'name' => 'max:40',
        ]);
        if($validator->fails()){
            return $validator;
        }
        return TRUE;
    }
}
