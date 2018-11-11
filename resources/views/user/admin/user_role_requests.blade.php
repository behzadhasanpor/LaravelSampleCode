@extends('layouts.dashboard')
@section('title')
    درخواست کاربران
@stop
@section('content')
    <div class="container">
        @if($requests->count()>0)
    <table class="table">
        <tr>
            <th>ردیف</th>
            <th>نام کاربر</th>
            <th>نقش درخواستی</th>
            <th>متن درخواست</th>
            <th>تغییر وضعیت کاربر</th>
        </tr>


                @foreach($requests as $request)
                    @inject('user_class_name','App\appModels\User')
                    @inject('role_class_name','App\appModels\Role')
                <tr>
                    <?php $user=new $user_class_name;$user=$user->where(['id'=>$request->user_id])->first();?>
                    <?php $role=new $role_class_name;$role=$role->where(['id'=>$request->requested_id])->first();?>
                    <td>{{$request->id}}</td>
                    <td>{{$user->first_name}}</td>
                    <td>{{$role->name}}</td>
                    <td>{{$request->requested_text}}</td>
                    <td>
                        <form action="{{url('user/roles/add/'.$request->id)}}" method="post">
                            {{csrf_field()}}
                            <button class="btn btn-success" type="submit">
                                تایید
                            </button>
                        </form>
                        <form action="{{url('user/roles/abort/'.$request->id)}}" method="post">
                            {{csrf_field()}}
                            <button class="btn btn-danger" type="submit">
                                حذف
                            </button>
                        </form>
                    </td>
                </tr>
                @endforeach


        @else
            هیچ درخواستی مطرح نشده است
        @endif
    </table>
    </div>
@endsection
