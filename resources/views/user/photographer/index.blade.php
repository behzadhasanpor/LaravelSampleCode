@extends('layouts.dashboard')
@section('title')
    عکس های شما
@stop
@section('content')
<div class="container">
    <div class="row app-font-fantesy">
        <div class="container cell-12">
            <div data-role="panel"
                 data-title-caption="تصاویر شما"
                 data-title-icon="<span class='mif-tools'></span>"

            >

                <div data-role="panel"
                     data-title-caption="تصاویر شما"
                     data-title-icon="<span class='mif-images'></span>"

                >
                    <div class="d-flex flex-justify-center flex-wrap m-2">
                        <input type="text" id="search-images" data-role="search" onkeyup="searchPhotographerImages()" placeholder="جستجو نام عکس">
                    </div>

                    <ul id="images"
                        data-role="list"
                        data-sort-class="painting-price"
                        data-sort-dir="desc"
                        data-cls-list="unstyled-list row flex-justify-center mt-4"
                        data-cls-list-item="cell-sm-4 cell-md-2"
                        class="row"
                    >

                    </ul>
                </div>

                <div data-role="panel"
                     data-title-caption="ایجاد تصویر جدید"
                     data-title-icon="<span class='mif-create-new-folder'></span>"

                >
                        <form action="{{url('user/photographer')}}" class="cell-4" enctype="multipart/form-data" style="margin: 0 auto 0;" id="imageUpload" method="POST">
                        {{csrf_field()}}
                        <input type="file" class="cell-10" multiple data-role="file" name="image[]" data-caption="<span class='mif-image'>عکس(ها) را انتخاب کنید</span>">
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                        </form>
                        <h3>نام عکس</h3>
                        <input type="text" data-role="input" name="name" form="imageUpload">
                        <h3>انتخاب برچسب ها</h3>
                        <select data-role="select" name="tags[]" multiple form="imageUpload">
                                    @foreach($tags as $tag)
                                        <option value="{{$tag->id}}">{{$tag->name}}</option>
                                    @endforeach
                        </select>
                        <br>
                        در صورتی که تگ شما در تگ ها نیست:
                        <form action="{{url('user/tags')}}" method="post" onkeydown="if(event.keyCode == 13) event.preventDefault()" >
                                {{csrf_field()}}
                                <input type="text" data-role="taginput" name="tags" focus>
                                <button class="button info" type="submit">
                                    ایجاد تگهای جدید
                                </button>
                        </form>
                        <h3>انتخاب دسته ها</h3>
                        <select data-role="select" class="form-control" name="categories[]" multiple form="imageUpload">
                                @foreach($categories as $category)
                                    <option value="{{$category->id}}">{{$category->description}}</option>
                                @endforeach
                        </select>
                        <h3>انتخاب ارتباط با مقاله</h3>
                        <select data-role="select" class="form-control" name="article" form="imageUpload" >
                                <option value="none">هیچکدام</option>
                                @foreach($articles as $article)
                                <option value="{{$article->id}}">{{$article->title}}</option>
                                @endforeach
                        </select>
                        <h3>انتخاب ارتباط با اتومبیل</h3>
                        <select data-role="select" class="form-control" name="car" form="imageUpload">
                                <option value="none">هیچکدام</option>
                                @foreach($cars as $car)
                                    <option value="{{$car->id}}">{{$car->name}}</option>
                                @endforeach
                        </select>
                        <button class="button success" type="submit" form="imageUpload">
                                    ایجاد تصویر جدید
                                </button>
                </div>

            </div>
        </div>
    </div>
</div>
@stop