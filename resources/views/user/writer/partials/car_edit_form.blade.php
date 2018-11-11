<div class="row">
    <div class="cell-10" style="margin: 0 auto 0;" >
        <br>
            <div data-role="panel"
                 data-title-caption="ورود مشخصات ماشین"
                 data-title-icon="<span class='mif-automobile'></span>"
                 class="container app-font-fantesy"
            >
            <form class="form-horizontal" method="POST" action="{{ url($route) }}">
                {{ csrf_field() }}
                <div data-role="wizard" id="car-wizard">
                    <section><div class="page-content">

                            برند اتومبیل را انتخاب نمایید
                            <br>

                            <select id="role_selects" title="برند را انتخاب کنید" data-role="select" name="brand_id" >
                                @foreach($brands as $brand)
                                    <option
                                            @if($car->brand_id==$brand->id)
                                            selected="selected"
                                            @endif
                                            data-imagesrc="{{url($brand->image_path)}}" value="{{$brand->id}}">{{$brand->name}}</option>
                                @endforeach
                            </select>
                            @if($car->brand_id != NULL)
                                <img src="{{url(\App\carModels\Brand::where('id',$car->brand_id)->first()->image_path)}}" alt="لوگو">
                            @endif
                    </div></section>
                    <?php
                        $real_name=[
                                'مشخصات کلی',
                                'قیمت',
                                'امکانات',
                                'تکنیکال',
                                'مصرف سوخت',
                        ];
                        $i=0;
                    ?>
                    @foreach($car_fields as $sub_table_name => $sub_table)

                            <section class="wizard_section"><div class="page-content">
                                    <div data-role="panel"
                                         data-title-caption="{{$real_name[$i++]}}"
                                         class="container"
                                    >
                                        @foreach($sub_table as $name => $label)

                                                    @include('user.writer.partials.car_form_input',[
                                                        'type'=>'text',
                                                        'name'=>$sub_table_name.$name,
                                                        'sub_table_name'=>$sub_table_name,
                                                        'field_name'=>$name,
                                                        'label'=>$label,
                                                        'errors'=>$errors
                                                    ])

                                        @endforeach

                                    </div>
                            </div></section>
                    @endforeach
                </div>
                <div class="form-group">
                        <button type="submit" class="button success">
                            به روز رسانی
                        </button>
                </div>
            </form>
            </div>
    </div>
</div>