@extends('layouts.dashboard')
@section('title')
    صفحه ی شخصی شما
@stop
@section('content')
    <div class="container">
        <div class="row app-font-fantesy">
            <div class="container cell-12">
                <div data-role="panel"
                     data-title-caption="پنل تنظیمات اطلاعات شخصی"
                     data-title-icon="<span class='mif-dashboard'></span>"
                >
                    <div class="container cell-12">
                            <div data-role="panel"
                                 data-title-caption="پنل ادمین"
                                 data-title-icon="<span class='mif-command'></span>"

                            >
                        <?php
                        $url = ($me->image_path!=NULL)?url($me->image_path):"https://eightpointfivemillion.org/sites/default/files/styles/source_profile/public/default_images/profile-placeholder%40800.png";
                        ?>
                        <div class="row">
                            <div class="cell-4 img-container thumbnail " style="margin: 0 auto 0;">
                                <img src="{{$url}}">
                                <div class="image-overlay">
                                    <h2 class="text-light">{{$me->first_name}}</h2>
                                </div>
                            </div>
                        </div>
                        <br>
                        <form action="{{url('user/profile/image/'.$me->first_name)}}" class="dropzone needsclick cell-4" style="margin: 0 auto 0;" id="userImageUpload" method="POST">
                            {{csrf_field()}}
                            {{method_field("PATCH")}}
                            <div class="dz-message needsclick app-font-fantesy">
                                عکس خود رو اینجا درگ کنید<br />
                            </div>
                        </form>

                        <form action="{{url('user/profile')}}" method="post">
                            {{csrf_field()}}
                            {{method_field('PATCH')}}
                            <h3>نام</h3>
                            <input type="text" data-role="input" name="first_name" value="{{$me->first_name}}">
                            <h3>نام خانوادگی</h3>
                            <input type="text" data-role="input" name="last_name" value="{{$me->last_name}}">
                            <h3>شماره تلفن</h3>
                            <input type="tel" data-role="input" name="tel" value="{{$me->tel}}">
                            <h3>آدرس</h3>
                            <input type="text" data-role="input" name="address" value="{{$me->address}}">
                            <h3>توضیحاتی در مورد خودتان</h3>
                            <textarea data-role="textarea" data-auto-size="true" data-max-height="200" name="description">{{$me->description}}</textarea>
                            <button type="submit" class="button success">
                                به روز رساتی
                            </button>
                        </form>
                    </div>
            </div>
        </div>
    </div>
    </div>
    </div>
@endsection
