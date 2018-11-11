@extends('layouts.app')
@section('title')
    دسترسی مجاز نیست
@stop
@section('content')
    این صفحه تنها برای کاربران ادمین قابل دسترسی می باشد
    <br>
    <div class="container">
        <a href="{{url('/')}}">برگشت به صفحه اصلی</a>
    </div>
@endsection
