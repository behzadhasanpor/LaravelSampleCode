@extends('layouts.app')
@section('title')
    برندهای اتومبیل
@stop

    @section('content')

        <div data-role="panel"
             data-title-caption="برندهای مختلف"
             data-title-icon="<span class='mif-trademark'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
            <div class="row">
            @foreach ($brands as $brand)
                    <a href="{{url('brands/'.$brand->name)}}" class=" cell-3">
                        <div class="img-container">
                            <img src="{{url($brand->image_path)}}">
                            <div class="image-overlay op-amber">
                                <h2 class="text-light">{{$brand->name}}</h2>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    @stop