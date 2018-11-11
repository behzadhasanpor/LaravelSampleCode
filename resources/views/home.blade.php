@extends('layouts.dashboard')
@section('title')
    صفحه ی شخصی شما
@stop
@section('content')
<div class="container">
    <div class="row app-font-fantesy">
        <div class="container cell-12">
            <div data-role="panel"
                 data-title-caption="پنل تنظیمات حساب کاربری"
                 data-title-icon="<span class='mif-tools'></span>"
                 data-collapsible="true"

            >
                @if($roles->count()>0)
                    نقش های شما در سایت:
                    @foreach($roles as $role)
                        {{$role->label}} |
                    @endforeach

                @else
                    شما هیچ نقشی در سایت ندارید
                @endif
                درخواست تغییر نقش دارید؟
                <a href="{{url('user/roles')}}">کلیک کنید</a>
                <br>
                <br>
            </div>
        </div>
        <div class="container cell-12">
            @can('admin')
                <div data-role="panel"
                     data-title-caption="پنل ادمین"
                     data-title-icon="<span class='mif-command'></span>"
                     data-collapsible="true"

                >
                    <a href="{{url('user/admin/user_role_requests')}}">درخواست تغییر نقش کاربران سایت</a>
                </div>
            @endcan
        </div>

        <div class="container cell-12">
            @can('writer')
                <div data-role="panel"
                     data-title-caption="پنل نویسنده"
                     data-title-icon="<span class='mif-pencil'></span>"
                     data-collapsible="true"

                >
                    <a href="{{url('user/writer/cars')}}">معرفی اتومبیل جدید</a><br>
                    <a href="{{url('user/writer/articles')}}">مقالات شما</a>
                </div>
            @endcan
        </div>

        <div class="container cell-12">
            @can('photographer')
                <div data-role="panel"
                     data-title-caption="پنل عکاس"
                     data-title-icon="<span class='mif-images'></span>"
                     data-collapsible="true"

                >
                    <a href="{{url('user/photographer')}}">عکس های شما</a>
                </div>
            @endcan
        </div>
    </div>
</div>
@endsection
