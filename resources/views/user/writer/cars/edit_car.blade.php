@extends('layouts.dashboard')
@section('title')
    ویرایش اتومبیل
@stop
@section('content')
    <div class="container">
        <div class="row app-font-fantesy ">
            <div data-role="panel"
                 data-title-caption="اتومبیل {{$car->name}}"
                 data-title-icon="<span class='mif-automobile'></span>"
                 class="cell-12 container"
            >
                <?php
                $url = ($car->image_path!=NULL)?url($car->image_path):"https://image.flaticon.com/icons/svg/741/741407.svg"
                ?>
                <div class="row">
                    <div class="cell-4 img-container thumbnail " style="margin: 0 auto 0;">
                        <img src="{{$url}}">
                        <div class="image-overlay">
                            <h2 class="text-light">{{$car->name}}</h2>
                        </div>
                    </div>
                </div>
                <br>
                <form action="{{url('user/writer/cars/add_image/'.$car->id.'/'.$car->name)}}" class="dropzone needsclick cell-4" style="margin: 0 auto 0;" id="carImageUpload" method="POST">
                    {{csrf_field()}}
                    <div class="dz-message needsclick app-font-fantesy">
                        عکس اتومبیل رو اینجا بکشید<br />
                    </div>
                </form>
                @include('user.writer.partials.car_edit_form',
                [
                    'route'=>'user/writer/cars/'.$car->id,
                    'car'=>$car,
                    'car_fields'=>$car_fields,
                    'brands'=>$brands,
                    'errors'=>$errors
                ])
            </div>
        </div>
    </div>
@endsection