@extends('layouts.dashboard')
@section('title')
    مدیریت اتومبیل های معرفی شده توسط شما
@stop
@section('content')
    <div class="container">
        <div class="row app-font-fantesy">
            <div class="container cell-10">
                <div data-role="panel"
                     data-title-caption="اتومبیل های شما"
                     data-title-icon="<span class='mif-paint'></span>"
                     data-collapsible="true"
                >
                    <p class="text-center h3 text-light">اتومبیل های شما</p>
                    <div class="d-flex flex-justify-center flex-wrap m-2">
                        <input type="text" id="search-cars" data-role="search" onkeyup="searchWriterCars()" placeholder="جستجو نام عکس">
                    </div>

                    <ul id="cars"
                        data-role="list"
                        data-sort-class="painting-price"
                        data-sort-dir="desc"
                        data-cls-list="unstyled-list row flex-justify-center mt-4"
                        data-cls-list-item="cell-sm-4 cell-md-2"
                        class="row"
                    >

                    </ul>
                    <form action="{{url('/user/writer/cars')}}" method="post" class="form-group">
                        {{csrf_field()}}
                        <button class="button success">
                            &Colon; ایجاد اتومبیل جدید
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
