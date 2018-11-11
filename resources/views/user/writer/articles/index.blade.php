@extends('layouts.dashboard')
@section('title')
    مقالات شما
@stop
@section('content')
    <div class="container">
        <div class="row app-font-fantesy">
            <div class="container cell-8">
                <div data-role="panel"
                     data-title-caption="مقالات شما"
                     data-title-icon="<span class='mif-tools'></span>"

                >




                    <table class="table striped table-border mt-4"
                           data-role="table"
                           data-cls-table-top="row flex-nowrap"
                           data-cls-search="cell-md-8"
                           data-show-search="true"
                           data-cls-rows-count="cell-md-4"
                           data-rows="5"
                           data-rows-steps="5, 10">
                        <thead>
                        <tr>
                            <th class="sortable-column">عنوان</th>
                            <th class="sortable-column">تغییرات</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($articles as $article)
                            <tr>
                                <td>{{$article->title}}</td>
                                <td>
                                    <a href="{{url('user/writer/articles/edit/'.$article->id.'/'.$article->title)}}">
                                        <button class="button info">ویرایش کنید</button>
                                    </a>
                                    <form action="{{url('/user/writer/articles/'.$article->id)}}" method="post" class="form-group">
                                        {{csrf_field()}}
                                        {{method_field('DELETE')}}
                                        <button class="button dark">
                                            حذف مقاله
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <form action="{{url('/user/writer/articles')}}" method="post" class="form-group">
                        {{csrf_field()}}
                        <button class="button success">
                            &Colon; ایجاد مقاله چدید
                        </button>
                    </form>
              </div>
            </div>
        </div>
    </div>
@endsection
