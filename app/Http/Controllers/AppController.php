<?php

namespace App\Http\Controllers;


use App\appModels\Category;
use App\appModels\Image;
use App\appModels\Tag;
use App\articleModels\Article;
use App\carModels\Brand;
use App\carModels\Car;

class AppController extends Controller
{

    // TODO : make massage location and send massage between users!
    protected $mismatch_error_massage='عدم تطابق اطلاعات ورودی با پایگاه داده.';

    public $compareCarBrandArray=[
        'car1'=>[
            'car'=>1,
            'brand'=>29
        ],
        'car2'=>[
            'car'=>1,
            'brand'=>29
        ]
    ];
    public function index()
    {
        return view('app.garage');
    }
    public function workshop()
    {
        return view('app.workshop');
    }
    public function cars(Car $car,$name)
    {
        $this->check_car_match($car,$name);
        $car_fields=(new CarController())->getCar_fields();
        visit()->car($car)->set();
        $images=Image::all()->where('car_id',$car->id)->all();
        return view('app.cars.car',
            [
                'car_fields'=>$car_fields,
                'car'=>$car,
                'images'=>$images,
                'brand_image'=>Brand::where('id',$car->brand_id)->first()->image_path,
            ]
        );
    }
    public function articles(Article $article,$title)
    {
        $this->check_article_match($article,$title);
        $user=$article->user;
        visit()->article($article)->set();
        $images=Image::all()->where('article_id',$article->id)->all();
        $comments=$article->article_comments;
        $roles=$user->roles;
        return view('app.articles.index',compact('article','user','comments','roles','images'));
    }
    public function __call($method,$args)
    {
        $func_names=$this->getCategoryNames();
        if(array_key_exists($method,$func_names)){
            $category=Category::whereName($method)->first();
            $num_in_page=30;
            $articles=$category->articles()->paginate($num_in_page);
            return view('app.categories.index',compact('category','articles','num_in_page'));
        }
        parent::__call($method,$args);
    }
    public function tagSearch(Tag $tag,$name)
    {
        $this->check_tag_match($tag,$name);
        visit()->tag($tag)->set();
        $articles=$tag->articles;
        return view('app.tags.index',compact('tag','articles'));
    }
    public function all_cars()
    {
        $cars=Car::where('name','LIKE','%'.request()->search.'%')->paginate(3);
        return view('app.cars.index',compact('cars'));
    }


    /**
     * compare two cars
     * the validation not require there because if 4 entries is not set
     * the checkCompareSubmitted() method will define its own default.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function compare()
    {
        list($car1,$cars1)=$this->getFirstCarAndCars();
        list($car2,$cars2)=$this->getSecondCarAndCars();
        $car_fields=(new CarController())->getCar_fields();
        $brands=Brand::all();
        return view('app.compare',compact('car1','car2','search_flag','car_fields','brands','cars1','cars2'));
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
    protected function check_tag_match($tag,$name)
    {
        if($tag->name!=$name){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function getFirstCarAndCars()
    {
        $car1_id=$this->checkCompareSubmitted()?request()->car1:$this->compareCarBrandArray['car1']['car'];
        $brand1_id=$this->checkCompareSubmitted()?request()->brand1:$this->compareCarBrandArray['car1']['brand'];
        $car1=Car::find($car1_id);
        $cars1=Car::getAllBrandOfId($brand1_id);
        return [
            $car1,
            $cars1
        ];
    }
    protected function getSecondCarAndCars()
    {
        $car2_id=$this->checkCompareSubmitted()?request()->car2:$this->compareCarBrandArray['car2']['car'];
        $brand2_id=$this->checkCompareSubmitted()?request()->brand2:$this->compareCarBrandArray['car2']['brand'];
        $car2=Car::find($car2_id);
        $cars2=Car::getAllBrandOfId($brand2_id);
        return [
            $car2,
            $cars2
        ];
    }
    protected function checkCompareSubmitted()
    {
        return isset(request()->car1) && isset(request()->car2) && isset(request()->brand1) && isset(request()->brand2);
    }
    protected function getCategoryNames()
    {
        return $this->generateCategoryNames();
    }
    protected function generateCategoryNames()
    {
        $names=[];
        foreach (Category::all('name')->all() as $category){
            $names[$category->name]=true;
        }
        return $names;
    }
}
