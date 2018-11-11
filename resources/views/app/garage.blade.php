@extends('layouts.garage')
@section('title')
   گاراژ
@stop
@section('content')

<div class="container-fluid">

    <div class="row">
        <div data-role="panel"
             data-title-caption="جدید ترین اتومبیل ها"
             data-title-icon="<span class='mif-automobile'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                <div class="row">

                    @foreach($cars as $car)
                        <?php
                        $url = ($car->image_path!=NULL)?url($car->image_path):"https://image.flaticon.com/icons/svg/741/741407.svg"
                        ?>
                        <div class="card image-header cell-3">
                            <div class="card-header fg-white"
                                 style="background-image:url('{{$url}}')">
                                {{$car->name}}
                            </div>
                            <div class="card-content p-2">
                                <p class="fg-gray"><span class='mif-eye'></span> {{visit()->car($car)->getVisitNumber()}}</p>
                            </div>
                            <div class="card-footer">
                                <a href="{{url('cars/'.$car->id.'/'.$car->name)}}" class="btn btn-primary">مشخصات فنی</a>
                            </div>
                        </div>
                    @endforeach
                </div>
            @if(count($cars)==$car_limit)
                <div class="h-100"><a  href="{{url('/cars/')}}"><button class="button drop-shadow dark">بیشتر</button></a></div>
            @endif
        </div>
    </div>
    <br>
    <hr class="cell-10">
    <br>

  @foreach($categories as $category)
      <?php
        $articles=getArticleWithCategory($category->name,$articles_limit);
        $icons=[
            'news'=>'news',
            'new_cars'=>'earth',
            'soon'=>'calender',
            'technology'=>'magic-wand',
            'fastest'=>'rocket',
            'strongest'=>'cogs',
            'sports'=>'trophy'
        ];
        ?>
    @if(count($articles)!=0)
    <div class="row">
        <div data-role="panel"
             data-title-caption="{{$category->description}}"
             data-title-icon="<span class='mif-{{$icons[$category->name]}}'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                <div class="row">
                    @foreach($articles as $article)
                        <?php
                        $url = (getNumberImageInPassage($article->passage,0)!=FALSE)?(url(getNumberImageInPassage($article->passage,0))):"https://image.flaticon.com/icons/svg/741/741407.svg";
                        ?>
                        <div class="card image-header cell-3">
                            <div class="card-header fg-white"
                                 style="background-image:url({{$url}})">
                                {{$article->title}}
                            </div>
                            <div class="card-content p-2">
                                <p>{{str_limit(getRawTextFromPassage($article->passage),100)}}</p>
                                <p class="fg-gray"><span class='mif-eye'></span> {{visit()->article($article)->getVisitNumber()}}</p>
                            </div>
                            <div class="card-footer">
                                <a href="{{url('articles/'.$article->id.'/'.$article->title)}}" class="">مطالعه ی بیشتر</a>
                            </div>
                        </div>
                    @endforeach
                    @if(count($articles)==$articles_limit)
                        <div class="h-100"><a  href="{{url('/categories/'.$category->description)}}"><button class="button drop-shadow dark">بیشتر</button></a></div>
                    @endif
                </div>
        </div>
    </div>
  @endif
          <br>
          <hr class="cell-10">
          <br>
  @endforeach
</div>
@stop