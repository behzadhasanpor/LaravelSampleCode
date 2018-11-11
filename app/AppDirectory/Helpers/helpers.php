<?php


use App\AppDirectory\Classes\Massage;
use App\AppDirectory\Classes\Visit;
use App\AppDirectory\Classes\Vote;
use App\articleModels\Article;
use Carbon\Carbon;
use OpenCafe\Datium;

function match_url($current_route_uri,$value){
    echo ($current_route_uri==$value)?'bg-darkGrayBlue fg-white':'';
}
function makeFullImageCollection(){
    echo
    "
        <br><p id='image-collection-btn' class='app-font-fantesy' >عکسدونی</p><br>            
     ";
}
function getRawTextFromPassage($html){
    return strip_tags($html);
}
function getDomInstanceOfPassage($html){
    $doc = new DOMDocument();
    $doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    return $doc;
}
function getNumberImageInPassage($html,$number=0)
{
    $selector = new DOMXPath(getDomInstanceOfPassage($html));
    $result = $selector->query('//img');
    return (!isset($result[0]))?FALSE:$result[$number]->getAttribute('src');
}
function getArticleWithCategory($category_name,$limit,$orderBy='ASCE'){
    return
        Article::with('categories')
        ->whereHas('categories',
            function ($q) use($category_name) {
            $q->where('name',$category_name);}
            )
            ->orderBy('created_at',$orderBy)
            ->limit($limit)
            ->get()
            ->all();
}
function getDatium(Carbon $carbon){
    return Datium::create(
        $carbon->year,
        $carbon->month,
        $carbon->day,
        $carbon->hour,
        $carbon->minute,
        $carbon->second
    );
}
function getHijriInstance(Carbon $carbon){
    return Datium::create(
        $carbon->year,
        $carbon->month,
        $carbon->day,
        $carbon->hour,
        $carbon->minute,
        $carbon->second
    )->to('jalali')->lang('fa')->get();
}
function getDiffJalali(Carbon $carbon){
    return Datium::diff(getDatium($carbon)->object(),Datium::now()->object())->simple->lang('fa')->get();
}
function massage()
{
    return (new Massage());
}
function receive($name)
{
    $nameAssignments=[
        'error'=>'خطا',
        'warning'=>'اخطار',
        'info'=>'اطلاع',
        'success'=>'موفقیت'
    ];
    $classAssignments=[
        'error'=>'danger',
        'warning'=>'warning',
        'info'=>'info',
        'success'=>'success'
    ];
    if(session()->has($name)){
        $title1=session()->get($name)['title'];
        $title= 'پیام '.$nameAssignments[$name].'<br>'.$title1;
        $passage=session()->get($name)['passage'];
        echo "var notify_$name = Metro.notify;
        notify_$name.create('$passage','$title',{
            keepOpen : true,
            width    : 450,
            cls      : \"$classAssignments[$name] app-font-fantesy\"
        })";
    }
}
function visit(){
    return (new Visit());
}
function vote(){
    return (new Vote());
}


