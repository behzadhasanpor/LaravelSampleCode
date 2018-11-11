<div class="form-group{{ $errors->has($name) ? ' has-error' : '' }}">
    <label for="{{$name}}" class="col-md-4 control-label">{{$label}}</label>
    <div data-role="input">
        <input id="{{$name}}" type="{{$type}}" class="form-control" name="{{$name}}"
               value=
                @if($sub_table_name=='main')
                       "{{$car->$field_name}}"
               @else
                       @inject('DB','Illuminate\Support\Facades\DB')
                <?php
                $table_instance=$DB::table($sub_table_name)->where(['car_id'=>$car->id])->get()->first();

                ?>
                "{{$table_instance->$field_name}}"
               @endif


               autofocus>
        @if ($errors->has($name))
            <span class="help-block">
                <strong>{{ $errors->first($name) }}</strong>
            </span>
        @endif
    </div>
</div>