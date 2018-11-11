@extends('layouts.app')
@section('title')
    تمام اتومبیل ها
@stop
@section('content')

    <div class="container-fluid">
        <div class="row">
            <div data-role="panel"
                 data-title-caption="تمام اتومبیل ها"
                 data-title-icon="<span class='mif-automobile'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                <div class="grid">
                    <div class="row">
                      <form class="cell-12" action="{{url('/cars')}}" id="searchCar" >
                        <input type="text" data-role="search" name="search" value="{{(isset(request()->search)?(request()->search):'')}}" >
                      </form>
                    </div>
                    <div class="row">
                        @if(count($cars)>0)
                        @foreach($cars as $car)
                            <?php
                            $url = ($car->image_path!=NULL)?url($car->image_path):"https://image.flaticon.com/icons/svg/741/741407.svg"
                            ?>
                            <div class="card image-header cell-3">
                                <div class="card-header fg-white"
                                     style="background-image:url('{{$url}}')">
                                    {{$car->name}}
                                </div>
                                <div class="card-content p-2">
                                    <p class="fg-gray"><span class='mif-eye'></span> {{count($car->car_visits)}}</p>
                                </div>
                                <div class="card-footer">
                                    <a href="{{url('cars/'.$car->id.'/'.$car->name)}}" class="btn btn-primary">مشخصات فنی</a>
                                </div>
                            </div>
                        @endforeach
                        @else
                            اتومبیلی پیدا نشد
                        @endif
                    </div>
                </div>

                <div class="cell-5">
                    {!! $cars->links() !!}
                </div>
            </div>
        </div>
    </div>
@endsection