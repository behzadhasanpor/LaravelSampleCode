@extends('layouts.app')
@section('title')
    {{$user->first_name.' '.$user->last_name}}
@stop
@section('content')
        <div class="row">
            <div data-role="panel"
                 data-title-caption="{{$user->first_name.' '.$user->last_name}}"
                 data-title-icon="<span class='mif-user'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkGrayBlue">
                <button class="button" onclick="toggleUserVote(this,'{{$user->id}}','{{$user->first_name}}')"><span
                            @if(vote()->user($user)->check())
                                class="mif-star-full"
                            @else
                                class="mif-star-empty"
                            @endif
                    ></span> Star</button>

                <button class="button info">{{vote()->user($user)->getVisitNumber()}}</button>
                <br>
                <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
                    <button class="button app-font-fantesy"><span class="mif-eye"></span> بازدید</button>
                    <button class="button info">{{visit()->user($user)->getVisitNumber()}}</button>
                </div>
                <div class="row  pt-12 pr-12">

                    <?php
                    $url_img_user = ($user->image_path!=NULL)?url($user->image_path):"https://eightpointfivemillion.org/sites/default/files/styles/source_profile/public/default_images/profile-placeholder%40800.png";
                    ?>
                    <div class="img-container cell-4 thumbnail">
                        <img src="{{$url_img_user}}">
                        <div class="image-overlay">
                            <h2 class="text-light">{{$user->first_name.' '.$user->last_name}}</h2>
                        </div>
                    </div>
                    <div class="cell-4">
                        <br>
                        <br>
                        <h3>{{$user->first_name.' '.$user->last_name}}</h3>
                        <p>{{$user->email}}</p>
                        <p>
                            <?php
                            $counter=0;
                            ?>
                            @foreach ($user->roles as $role)
                                <?php
                                $counter++;
                                ?>
                                @unless($role->name=='normal')
                                    {{$role->label}}
                                @endif
                                @if ($counter <= (count($user->roles)-2))
                                    ,
                                @endif
                            @endforeach
                        </p>
                    </div>
                </div>
                @if(strlen($user->description)>2)
                <br>
                <hr class="cell-10">
                <br>
                <div class="row pr-4">
                    <h3 class="fg-darkAmber">درباره من :</h3>
                    <div class="cell-12 pr-2">
                        {{$user->description}}
                    </div>
                </div>
                @endif
                <br>
                <hr class="cell-10">
                <br>
                @if(count($my_cars)>0)
                    <div class="row">
                    <div data-role="panel"
                         data-title-caption="اتومبیل های من"
                         data-title-icon="<span class='mif-automobile'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                        <div class="row">
                            @foreach($my_cars as $car)
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
                    </div>
                    @if(count($my_cars)==$my_cars_limit)
                        <div class="h-100"><a class="app-more-link" href="{{url('/cars/'.$car->id)}}"><button class="btn btn-info">بیشتر</button></a></div>
                    @endif
                </div>
                @endif
                <br>
                <hr class="cell-10">
                <br>
                @if(count($my_articles)>0)
                    <div class="row">
                        <div data-role="panel"
                             data-title-caption="مقالات من"
                             data-title-icon="<span class='mif-file-text'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                            <div class="row">
                                @foreach($my_articles as $article)
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
                                @if(count($my_articles)==$my_articles_limit)
                                    <div class="h-100"><a class="app-more-link" href="{{url('/categories/'.$category->description)}}"><button class="btn btn-info">بیشتر</button></a></div>
                                @endif
                            </div>
                        </div>
                    </div>
                @endif
                </div>
        </div>

@endsection
