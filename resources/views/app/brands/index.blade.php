@extends('layouts.app')
@section('title')
    اتومبیل های {{$brand->name}}
@stop

@section('content')
    @if (count($cars)>0)
    <div data-role="panel"
         data-title-caption=" ماشین های برند {{$brand->name}}"
         data-title-icon="<span class='mif-display'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
            <div class="row">
                    <div class="col-md-8">
                        @foreach($cars as $car)
                            <div class="card col-md-4" style="width: 18rem;">
                                <img class="img-thumbnail app-table-img card-img-top" src="{{url("$car->image_path")}}" src="{{$car->image_path}}" alt="عکس موجود نیست">
                                <div class="card-body">
                                    <h5 class="card-title">{{$car->name}}</h5>
                                    <a href="{{url('cars/'.$car->id.'/'.$car->name)}}" class="btn btn-primary">مشخصات فنی</a>
                                </div>
                            </div>
                        @endforeach
                    </div>
            </div>
    </div>
    @else
        <div data-role="panel"
             data-title-caption=""
             data-title-icon="<span class='mif-notification'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
            <div class="row">
                    تاکنون هیچ اتومبیلی متعلق به این برند ثبت نشده است.
                </div>
        </div>
    @endif
@stop