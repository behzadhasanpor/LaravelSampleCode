@extends('layouts.app')
@section('title')
    {{$article->title}}
@stop
@section('content')
    <div class="container app-font-fantesy app-font-size-panel-title">

        <div data-role="panel"
             data-title-caption="{{$article->title}}"
             data-title-icon="<span class='mif-leanpub'></span>"
        >
            <button class="image-button app-font-koodak" id="collapse_toggle_1">
                <span class="mif-link icon"></span>
                <span class="caption">جزییات</span>
            </button>
            <div class="pos-relative">
                <div class="bg-lightGrayBlue fg-white "
                     data-role="collapse"
                     data-toggle-element="#collapse_toggle_1">
                    <p class="pt-2 pr-4 ">
                            <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
                                <button class="button app-font-fantesy"><span class="mif-eye"></span> بازدید</button>
                                <button class="button info">{{visit()->article($article)->getVisitNumber()}}</button>
                            </div>
                            <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
                                <button class="button app-font-fantesy"><span class="mif-calendar"></span> پست شده</button>
                                <button class="button info">{{getHijriInstance($article->created_at)}}</button>
                            </div>
                            <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
                                <button class="button app-font-fantesy"><span class="mif-calendar"></span> آخرین به روز رسانی</button>
                                <button class="button info">{{getHijriInstance($article->updated_at)}}</button>
                            </div>
                            <br>
                            <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
                                <button class="button app-font-fantesy"><span class="mif-command"></span>دسته بندی ها</button>
                                @foreach($article->categories as $category)
                                    <a id="article-tags" class="button info" href="{{url('categories/'.$category->description)}}">{{$category->description}}</a>
                                @endforeach
                            </div>
                            <br>
                            <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
                                <button class="button app-font-fantesy"><span class="mif-tags"></span>برچسب ها</button>
                                @foreach($article->tags as $tag)
                                    <a id="article-tags" class="button info" href="{{url('tags/'.$tag->id.'/'.$tag->name)}}">{{$tag->name}}</a>
                                @endforeach
                            </div>
                    </p>
                </div>
            </div>
            توسط:
            <br>
            <div data-role="panel"
                 data-title-caption="<a href='{{url('/users/'.$user->id.'/'.$user->first_name)}}' >{{$user->first_name.' '.$user->last_name}}</a>"
                 data-title-icon="<span class='mif-user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                '></span>"
                 data-width="240"
                 data-collapsible="true"
                 data-draggable="true">
                <?php
                $image_url = ($user->image_path!=NULL)?url($user->image_path):"https://www.heartland.org/sebin/a/z/profile-default-320.gif";
                ?>
                <div class="app-avatar">
                    <img  src="{{url($image_url)}}" >
                </div>
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
            <br>
            <div class="row">
                <div class="cell-11">
                  <h1 class=" border-bottom border-top bd-amber">{{$article->title}}</h1>
                </div>
                <div class="cell-1">
                    <div class="info-button">



                        <button class="button" onclick="toggleArticleVote(this,'{{$article->id}}','{{$article->title}}')"><span
                            @if(vote()->article($article)->check())
                                class="mif-star-full"
                            @else
                                class="mif-star-empty"
                            @endif
                            ></span> Star</button>
                        <button class="button info">{{vote()->article($article)->getVisitNumber()}}</button>

                    </div>
                </div>
            </div>
            <br>

            <div class="p-5">
                {!! $article->passage !!}
            </div>
<hr>
        </div>

        @if(count($images)>0)
            <div data-role="panel"
                 data-title-caption="عکسهای مربوط به {{$article->title}}"
                 data-title-icon="<span class='mif-automobile'></span>"

            >
              <div class="row">
                @foreach($images as $image)
                    <a href="{{url($image->path)}}" class="cell-2">
                        <div class="img-container">
                            <img src="{{url($image->path)}}">
                            <div class="image-overlay">
                                <h2 class="text-light">{{$image->name}}</h2>
                            </div>
                        </div>
                    </a>
                @endforeach
                </div>
            </div>
        @endif

    </div>
            <hr>
            <div class="mx-auto"
                 data-role="panel"
                 data-title-caption="نظردهی"
                 data-title-icon="<span class='mif-user'></span>"
                 data-cls-panel="shadow-3"
                 data-cls-title="fg-darkGrayBlue bg-lightGray"
                 data-cls-title-icon="fg-darkAmber"
                 data-cls-content="fg-darkGrayBlue"
            >
                <div class="card-body">
                    <form action="{{url('articles/comments/'.$article->id.'/'.$article->title)}}" method="post">
                        {{csrf_field()}}
                        <div class="form-group">
                            <label>نام</label>
                            <input name="creator" class="cell-4" type="text" data-role="creator" value="{{old('creator')}}" >
                        </div>
                        <div class="form-group">
                            <label>متن</label>
                            <textarea name="passage" data-role="textarea" data-auto-size="true" data-max-height="200">{{old('passage')}}</textarea>
                        </div>
                        <button type="submit" class="button drop-shadow dark app-font-fantesy">ارسال</button>
                    </form>
                </div>
            </div>
            <br>
            @can('scientist')
                <div data-role="panel"
                     data-title-caption="مدیریت نظرات"
                     data-title-icon="<span class='mif-apps'></span>">
                      @foreach($comments as $comment)
                        <div data-role="panel"
                             data-title-caption="{{$comment->creator}}"
                             data-title-icon="<img data-role='gravatar' data-email='a@b.com' data-default='mm'>">
                            <input type="checkbox" class="fg-darkGrayBlue" data-role="switch" data-caption="قابلیت نمایش به افراد"
                            @if($comment->visibility)
                                checked="checked"
                            @endif
                                    onclick="toggleVisibility(this,'{{$comment->id}}','{{$comment->creator}}')"
                            >
                            @if(count($comment->article_comment_replays)>0)
                                <br>
                                پاسخ ها
                                <br>
                                @foreach($comment->article_comment_replays as $replay)
                                    <?php
                                    $image_url = ($replay->user->image_path!=NULL)?url($replay->user->image_path):"https://www.heartland.org/sebin/a/z/profile-default-320.gif";
                                    ?>
                                    <div data-role="panel"
                                         data-title-caption="{{$replay->user->first_name}}"
                                         data-title-icon="<div class='app-avatar-comment'>
                                                                    <img  src='{{url($image_url)}}' >
                                                                      </div>">
                                        <p>{{$replay->passage}}</p>
                                    </div>
                                @endforeach
                            @endif
                          <p>{{$comment->passage}}</p>

                            <button class="button app-font-vahid" id="collapse_toggle_comment_{{$comment->id}}">پاسخ دهی</button>
                              <div class="pos-relative">
                              <div class="bg-lightAmber fg-darkGrayBlue" data-role="collapse"
                                   data-toggle-element="#collapse_toggle_comment_{{$comment->id}}" data-collapsed="true">
                                <div class="media mb-4">
                                <div class="media-body">
                                        <div class="card-body">
                                            <form action="{{url('articles/comments/replay/'.$comment->id)}}" method="post">
                                                {{csrf_field()}}
                                                <div class="form-group">
                                                    <label>متن</label>
                                                    <textarea name="passage" data-role="textarea" data-auto-size="true" data-max-height="200">{{old('passage')}}</textarea>
                                                </div>
                                                <button type="submit" class="button drop-shadow dark app-font-fantesy">ارسال</button>
                                            </form>
                                        </div>
                                </div>
                            </div>
                                  @if ($errors->any())
                                      <div class="alert alert-danger">
                                          <ul>
                                              @foreach ($errors->all() as $error)
                                                  <li>{{ $error }}</li>
                                              @endforeach
                                          </ul>
                                      </div>
                                  @endif
                        </div>
                    </div>
                        </div>
                @endforeach
                </div>
            @endcan
            @if( ! \Illuminate\Support\Facades\Auth::check() ||  ! \Illuminate\Support\Facades\Auth::user()->isScientist())
                @foreach($comments->where('visibility',TRUE) as $comment)
                    <div data-role="panel"
                         data-title-caption="{{$comment->creator}}"
                         data-title-icon="<img data-role='gravatar' data-email='a@b.com' data-default='mm'>">
                              <p>{{$comment->passage}}</p>
                            @foreach($comment->article_comment_replays as $replay)
                            <?php
                            $image_url = ($replay->user->image_path!=NULL)?url($replay->user->image_path):"https://www.heartland.org/sebin/a/z/profile-default-320.gif";
                            ?>
                                    <div data-role="panel"
                                         data-title-caption="{{$replay->user->first_name}}"
                                     data-title-icon="<div class='app-avatar-comment'>
                                                                    <img  src='{{url($image_url)}}' >
                                                                      </div>">
                                        <p>{{$replay->passage}}</p>
                                    </div>
                            @endforeach
                        </div>

                    <hr>
                @endforeach
            @endif
        <div>
    </div>
@endsection



