@extends('layouts.dashboard')
@section('title')
    ویرایش مقاله ی {{$article->title}}
@stop
@section('image-collection')
    {{makeFullImageCollection()}}
@endsection
@section('content')
    <script src="https://cloud.tinymce.com/stable/tinymce.min.js"></script>

    <div class="container">
        <div class="row app-font-fantesy">
            <div class="container cell-12">
                <div data-role="panel"
                     data-title-caption="مقاله {{$article->title}}"
                     data-title-icon="<span class='mif-tools'></span>"

                >
                    <form id="article-edit" action="{{url('/user/writer/articles/'.$article->id.'/'.$article->title)}}" method="post" class="form-group">
                                        <p>عنوان</p>
                                        <input type="text" data-role="input" name="title" value="{{$article->title}}" >
                                        <p>متن</p>
                                        <textarea id="passage_editor" style="direction: ltr;font-family:Arial" class="form-control" name="passage" >{{$article->passage}}</textarea>
                                        <script src="https://cloud.tinymce.com/stable/tinymce.min.js"></script>
                                        <script>
                                            tinymce.init({
                                                selector:'#passage_editor',
                                                height:"450"
                                            })
                                        </script>
                                        <p>انتخاب برچسب</p>
                                        <select data-role="select"  class="form-control" name="tags[]" multiple>
                                            @foreach($tags as $tag)
                                                <option
                                                        @if($article->tags && $article->tags->contains('id',$tag->id))
                                                                selected
                                                        @endif
                                                        value="{{$tag->id}}">{{$tag->name}}</option>
                                            @endforeach
                                        </select>
                                        <p>انتخاب دسته</p>
                                        <select data-role="select" class="form-control" name="categories[]" id="exampleFormControlSelect1" multiple>
                                            @foreach($categories as $category)
                                                <option
                                                        @if(  $article->categories && $article->categories->contains('id',$category->id))
                                                        selected="selected"
                                                        @endif
                                                        value="{{$category->id}}">{{$category->description}}</option>
                                            @endforeach
                                        </select>
                                        <br>
                                        <br>
                        {{csrf_field()}}
                        {{method_field('PATCH')}}
                        <button class="button success">
                            به روز رسانی
                        </button>
                    </form>
                    <br>
                    در صورتی که تگ شما در تگ ها نیست:
                    <form action="{{url('/user/writer/articles/tags/'.$article->id)}}" onkeydown="if(event.keyCode == 13) event.preventDefault()" method="post">
                        {{csrf_field()}}
                            <input type="text" data-role="taginput" name="tags" focus>
                                @if ($errors->any())
                                    <div>
                                        <ul>
                                            @foreach ($errors->all() as $error)
                                                <li class="alert">{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif
                            <button class="button info" type="submit">
                                ایجاد تگهای جدید
                            </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection
