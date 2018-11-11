<!doctype html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="metro4:init" content="true">
    <meta name="metro4:locale" content="de-DE">
    <meta name="metro4:week_start" content="0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{url('/metroCss/app.css')}}">
    <link rel="stylesheet" href="https://cdn.metroui.org.ua/v4/css/metro-all.min.css">
    <link rel="stylesheet" href="{{url('/metroCss/all.css')}}">
    <script>
        var siteURL = '{{url("")}}'
    </script>
</head>
<body>
@inject('auth','Illuminate\Support\Facades\Auth')
<?php $auth_user=$auth::user();?>
<div class="grid">
    <div id="mainMenu" class="row">
        <ul class="h-menu bg-lightGray fg-darkGrayBlue container-fluid d-flex flex-row">
            <li><a class="{{match_url($current_route_uri,'/')}}" href="{{route('root')}}"><span class="mif-automobile icon"></span><br> گاراژ</a></li>
            <li><a class="{{match_url($current_route_uri,'brands')}}" href="{{route('brands')}}"><span class="mif-trademark icon"></span><br> برندهای خودرو</a></li>
            <li><a class="{{match_url($current_route_uri,'compare')}}" href="{{route('compare')}}"><span class="mif-microscope icon"></span><br> مقایسه خودرو ها</a></li>
            <li><a class="{{match_url($current_route_uri,'workshop')}}" href="{{route('workshop')}}"><span class="mif-tools icon"></span><br>تعمیرگاه</a></li>
            <li>
                <a href="#" class="dropdown-toggle"><span class="mif-command icon"></span><br>دسته ها</a>
                <ul class="d-menu bg-lightGray fg-darkGrayBlue" data-role="dropdown">
                    @foreach ($categories as $category)
                        <li><a class="{{match_url($current_route_name,$category->name)}}" href="{{url('categories/'.$category->description)}}">{{$category->description}}</a></li>
                        <li class="divider"></li>
                    @endforeach
                </ul>
            </li>
        </ul>
    </div>
    <div id="profile-menu" class="mt-2 row">

        <div class="cell-8 app-align-self-center">
        <div data-role="panel"
             data-title-caption="پنل کاربری"
             data-title-icon="<span class='mif-user'></span>"
             data-collapsible="true"
             data-collapsed="true">
                    <div class="grid">
                        <div class="row">
                            <div class="cell-2 mt-2">
                                <a href="{{url('/home')}}" class="app-link fg-darkGrayBlue"><span class="mif-perm-phone-msg icon"></span> تماس با ما</a>
                            </div>
                            <div class="cell-8"></div>
                            <div class="cell-2 mt-2">
                                @if($auth_user)
                                    <?php
                                    $image_url = ($auth_user->image_path!=NULL)?url($auth_user->image_path):"https://www.heartland.org/sebin/a/z/profile-default-320.gif";
                                    ?>
                                    <div class="app-avatar">
                                        <img  src="{{url($image_url)}}" >
                                    </div>
                                    <span class="title">{{$auth_user->first_name}} خوش اومدی</span><br>
                                    <a href="{{url('/home')}}" class="app-link fg-darkGrayBlue"><span class="mif-dashboard icon"></span> صفحه کاربری شما</a>
                                    <form action="{{route('logout')}}" method="post">
                                        {{csrf_field()}}
                                        <button class="button fg-darkGrayBlue drop-shadow app-font-fantesy"><span class="mif-exit icon"></span> خروج</button>
                                    </form>
                                @else
                                    <a href="{{url('/user/register')}}" class="fg-darkGrayBlue"><span class="mif-user-plus icon"></span> ثبت نام</a>
                                    <a href="{{url('/user/login')}}" class="fg-darkGrayBlue"><span class="mif-enter icon"></span> ورود</a>
                                @endif
                            </div>
                        </div>
                        <div class="row">
                            <div class="cell-2 ">
                                پایین
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <div id="mainContent" class="row content border border-solid">
        <div class="container-fluid">
            <div class="row container">
                <div id="right-side-menu" class="cell-9">
                    @yield('content')
                </div>
                <div id="left-side-menu" class="cell-3">
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
                            <div data-role="panel"
                                 data-title-caption="{{$category->description}}"
                                 data-title-icon="<span class='mif-{{$icons[$category->name]}}'></span>"
                                 class="fg-darkAmber w-100">
                                <ul data-role="listview"
                                    data-view="table"
                                    data-select-node="true"
                                >
                                    @foreach($articles as $article)
                                        <li><a href="{{url('articles/'.$article->id.'/'.$article->title)}}" class="fg-darkGrayBlue app-list-links">{{str_limit($article->title,50)}}</a></li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
<br><br>
<hr class="cell-11">
<br>
<footer class="footer-bg bg-lightGray">

</footer>
<script src="{{url('/metroJs/app.js')}}"></script>
<script src="{{url('/metroJs/all.js')}}"></script>
<script src="https://cdn.metroui.org.ua/v4/js/metro.min.js"></script>
<script>
    $(document).ready(()=>{
        <?php
        receive('error');
        receive('warning');
        receive('info');
        receive('success');
        ?>
    })
</script>
</body>
</html>