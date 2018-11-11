@extends('layouts.dashboard')
@section('title')
    نقش ها
@stop
@section('content')
    <div class="container">
        <div class="row app-font-fantesy">
            <div class="container cell-8">
                <div data-role="panel"
                     data-title-caption="درخواست تغییر نقش"
                     data-title-icon="<span class='mif-paint'></span>"
                     data-collapsible="true"

                >
                    نقش های پیشنهادی خود را انتخاب کنید<br>پس از بررسی توسط مدیران سایت نتیجه در صفحه ی کاربری شما منعکس خواهد شد <br><br>
                    <div class="row app-font-fantesy">
                        <div class="container cell-10">
                            <div data-role="panel"
                                 data-title-caption="فرم درخواست"
                                 data-title-icon="<span class='mif-attachment'></span>"
                                 data-collapsible="true"

                            >
                                @if ($errors->any())
                                    <div class="alert alert-danger">
                                        <ul>
                                            @foreach ($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                @endif
                                <form action="{{url('user/roles/')}}" method="POST" class="">
                                    {{csrf_field()}}
                                    {{method_field('PATCH')}}
                                    <select required data-role="select" id="role_selects" name="roles[]" multiple>
                                        @foreach($roles as $role)
                                            @if ($user_roles->contains('id',$role->id))
                                                <option  value="{{$role->id}}" selected="selected">{{$role->name}}</option>
                                            @else
                                                <option  value="{{$role->id}}">{{$role->name}}</option>
                                            @endif
                                        @endforeach
                                    </select>
                                    <textarea required data-role="textarea" data-auto-size="true" data-max-height="200"  name="requested_text">{{old('requested_text')}}</textarea>
                                    <input class="button info" type="submit" value="ارسال">
                                </form>
                    </div>
    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop