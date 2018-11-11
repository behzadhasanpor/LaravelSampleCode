@extends('layouts.app')
@section('title')
    {{$category->description}}
@stop
@section('content')
    <?php
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
    @if(count($articles)>0)
                <div class="row">
                    <div data-role="panel"
                         data-title-caption="{{$category->description}}"
                         data-title-icon="<span class='mif-{{$icons[$category->name]}}'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                        <div class="row">
                            @foreach($articles as $article)
                                <div class="card image-header cell-3">
                                    <div class="card-header fg-white"
                                         <?php
                                         $url=
                                             url(getNumberImageInPassage($article->passage,0)
                                             !=FALSE
                                                 ?
                                                 getNumberImageInPassage($article->passage,0)
                                                 :
                                                 "https://image.flaticon.com/icons/svg/741/741407.svg");
                                         ?>
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
                        </div>
                    </div>
                </div>
    @else
        <div class="row">
            <div data-role="panel"
                 data-title-caption="اطلاع"
                 data-title-icon="<span class='mif-search'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                <div class="row">
                    <div>
                        هنوز در این دسته مقاله ای به ثبت نرسیده است
                    </div>
        </div>
    @endif
@endsection
