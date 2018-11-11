@extends('layouts.app')
@section('title')
    مقایسه ی خودرو ها
@stop
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div data-role="panel"
                 data-title-caption="مقایسه اتومبیل ها"
                 data-title-icon="<span class='mif-automobile'></span>" class="w-100 app-font-fantesy app-font-size-panel-title fg-darkAmber">
                <div class="row container">

                    <div  style="margin: 0 auto 0;" class="row container-fluid cell-12">
                        <form action="{{url('compare')}}">
                            <div class="cell-5">
                                خودرو اول
                                <br>
                                <select data-role="select" id="brand1" name="brand1"  onchange="brand1Change(this)">
                                        @foreach ($brands as $brand)
                                            <option
                                                    @if($car1->brand_id==$brand->id)
                                                            selected="selected"
                                                    @endif
                                                    value="{{$brand->id}}">{{$brand->name}}</option>
                                        @endforeach
                                </select>
                                <select data-role="select" name="car1" id="auto1">
                                    @foreach($cars1 as $car)
                                        <option
                                                @if($car1->id==$car->id)selected="selected"@endif
                                                value="{{$car->id}}">{{$car->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="cell-5">
                                خودرو دوم
                                <br>
                                <select data-role="select" id="brand2" name="brand2"  onchange="brand2Change(this)" >
                                        @foreach ($brands as $brand)
                                            <option
                                                    @if($car2->brand_id==$brand->id)
                                                    selected="selected"
                                                    @endif
                                                    value="{{$brand->id}}">{{$brand->name}}</option>
                                        @endforeach
                                </select>
                                <select data-role="select" name="car2" id="auto2">
                                    @foreach($cars2 as $car)
                                        <option
                                                @if($car2->id==$car->id)selected="selected"@endif
                                                value="{{$car->id}}">{{$car->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="cell-5">
                                <button type="submit" class="button success">
                                    مقایسه کن
                                </button>
                            </div>
                        </form>
                    </div>
                    <br>
                    <hr class="cell-10">
                    <br>
                    <div style="margin: 0 auto 0" class="row container align-content-center" >
                        <div class="cell-6">
                            <div class="img-container">
                                <img src="{{url($car1->image_path)}}">
                                <div class="image-overlay">
                                    <h2 class="text-light">{{$car1->name}}</h2>
                                </div>
                            </div>
                        </div>
                        <div class="cell-6">
                            <div class="img-container">
                                <img src="{{url($car2->image_path)}}">
                                <div class="image-overlay">
                                    <h2 class="text-light">{{$car2->name}}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <hr class="cell-10">
                    <br>

                        <?php
                        $counter=0;
                        ?>
                            <div style="margin: 0 auto 0;"  class="row cell-10">
                                <table style="margin: 0 auto 0;" class="row table striped compact cell-border cell-hover">
                                    <thead>
                                    <tr>
                                        <td >{{'ویژگی'}}</td>
                                        <th>{{$car1->name}}</th>
                                        <th >{{$car2->name}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
        @foreach($car_fields as $sub_table_name => $sub_table)
            <?php
            $counter++;
            ?>

                        @if ($sub_table_name=='main')

                            @foreach($sub_table as $field_name => $real_name)
                                <tr>
                                    <td class="text-left fg-darkGrayBlue">{{$real_name}}</td>
                                    <td class="text-left fg-darkAmber">{{$car1->$field_name}}</td>
                                    <td class="fg-darkGrayBlue">{{$car2->$field_name}}</td>
                                </tr>
                            @endforeach

                        @else
                            @foreach($sub_table as $field_name => $real_name)
                                <tr>
                                    <td class="text-left fg-darkGrayBlue">{{$real_name}}</td>
                                    @inject('DB','Illuminate\Support\Facades\DB')
                                    <?php
                                        $table_instance1=$DB::table($sub_table_name)->where(['car_id'=>$car1->id])->get()->first();
                                    ?>
                                    <td class="text-left fg-darkAmber">{{$table_instance1->$field_name}}</td>
                                    <?php
                                    $table_instance2=$DB::table($sub_table_name)->where(['car_id'=>$car2->id])->get()->first();
                                    ?>
                                    <td class="fg-darkGrayBlue">{{$table_instance2->$field_name}}</td>
                                </tr>
                            @endforeach
                        @endif


        @endforeach
                                    </tbody>
                </table>
                <br>
                <hr class="cell-10">
                <br>
                            </div>

                </div>
            </div>
        </div>
    </div>
@stop