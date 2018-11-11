@extends('layouts.app')
@section('title')
    {{$tag->name}}
@stop
@section('content')
    @if(count($articles)>0)
            <div class="row">
                <div data-role="panel"
                     data-title-caption="{{$tag->name}}"
                     data-title-icon="<span class='mif-tag'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                    <div class="row">
                        <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
                            <button class="button app-font-fantesy"><span class="mif-eye"></span> بازدید</button>
                            <button class="button info">{{visit()->tag($tag)->getVisitNumber()}}</button>
                        </div>
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
                        این تگ برای هیچ مقاله ای انتخاب نشده است
                    </div>
                </div>
    @endif
@endsection
