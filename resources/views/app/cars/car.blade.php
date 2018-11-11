@extends('layouts.app')
@section('title')
    {{$car->name}}
@stop
@section('content')
    <div data-role="panel"
         data-title-caption="{{$car->name}}"
         data-title-icon="<span class='mif-automobile'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
        <?php
        $url = ($car->image_path!=NULL)?url($car->image_path):"https://image.flaticon.com/icons/svg/741/741407.svg"
        ?>
    <div class="container-fluid">

        <button class="button" onclick="toggleCarVote(this,'{{$car->id}}','{{$car->name}}')"><span
                    @if(vote()->car($car)->check())
                    class="mif-star-full"
                    @else
                    class="mif-star-empty"
                    @endif
            ></span> Star</button>
        <button class="button info">{{vote()->car($car)->getVisitNumber()}}</button>
        <br>
        <div class="info-button success bg-lightAmber fg-darkGrayBlue bd-lightAmber rounded">
            <button class="button app-font-fantesy"><span class="mif-eye"></span> بازدید</button>
            <button class="button info">{{visit()->car($car)->getVisitNumber()}}</button>
        </div>


        <div class="img-container thumbnail">
            <img src="{{$url}}">
            <span class="title app-font-size-large">
                {{$car->name}}
            </span>
        </div>
        <br>
        <div class="row">
            <div class="cell-2 img-container thumbnail">
                <img src="{{url($brand_image)}}">
            </div>
        </div>
        <br>
        <ul data-role="tabs" data-expand="sm">
                <li><a href="#_target_1">مشخصات کلی</a></li>
                <li><a href="#_target_2">قیمت ها</a></li>
                <li><a href="#_target_3">امکانات</a></li>
                <li><a href="#_target_4">تکنیکال</a></li>
                <li><a href="#_target_5">مصرف سوخت</a></li>
            </ul>
        <?php
        $counter=0;
        ?>
        <div class="border bd-default no-border-top p-2">
        @foreach($car_fields as $sub_table_name => $sub_table)
            <?php
            $counter++;
                ?>
                <div id="_target_{{$counter}}">
                    <table class="table striped compact cell-border cell-hover">
                        @if ($sub_table_name=='main')

                            @foreach($sub_table as $field_name => $real_name)
                                    <tr>
                                        <td class="text-left fg-darkGrayBlue">{{$real_name}}</td>
                                        <td class="fg-darkAmber">{{$car->$field_name}}</td>
                                    </tr>
                            @endforeach

                        @else
                            @foreach($sub_table as $field_name => $real_name)
                                <tr>
                                    <td class="text-left fg-darkGrayBlue">{{$real_name}}</td>
                                    @inject('DB','Illuminate\Support\Facades\DB')
                                    <?php
                                    $table_instance=$DB::table($sub_table_name)->where(['car_id'=>$car->id])->get()->first();

                                    ?>
                                    <td class="fg-darkAmber">{{$table_instance->$field_name}}</td>
                                </tr>
                            @endforeach
                        @endif
                    </table>
                </div>
          @endforeach
            </div>
        </div>
        <hr>
        @if(count($images)>0)
            <div data-role="panel"
                 data-title-caption="عکسهای مربوط به {{$car->name}}"
                 data-title-icon="<span class='mif-automobile'></span>"

            >
                <div class="row">
                    @foreach($images as $image)
                        <a href="{{url($image->path)}}" class="cell-2">
                            <div class="img-container">
                                <img src="{{url($image->path)}}">
                                <div class="image-overlay">
                                    <h2 class="text-light">{{$image->name}}</h2>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
@stop