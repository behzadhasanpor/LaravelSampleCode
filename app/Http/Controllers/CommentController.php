<?php

namespace App\Http\Controllers;

use App\articleModels\Article;
use App\articleModels\Article_comment;
use App\articleModels\Article_comment_replay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    protected $mismatch_error_massage='عدم تطابق اطلاعات ورودی با پایگاه داده.';

    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth',['except'=>[
            'create'
        ]]);
        $this->middleware('scientist',['except'=>[
            'create'
        ]]);
    }
    public function create(Request $request,Article $article,$title)
    {
        if($this->create_comment_validation($request)){
            $this->check_article_match($article,$title);
            $article->article_comments()->create($request->all());
            massage()->success('نظر دهی','کاربر گرامی نظر شما با موفقیت ثبت گردید.پس از بررسی توسط مدیران سایت نظر شما همراه پاسخ ثبت خواهد گردید.');
            return redirect('articles/'.$article->id.'/'.$article->title);
        }else{
            massage()->error('نظر دهی','ورودی هام نام و متن را بررسی کنید و دوباره تلاش نمایید');
            return redirect('articles/'.$article->id.'/'.$article->title);
        }
    }
    public function update(Request $request,Article_comment $article_comment,$creator)
    {
        if ($this->update_comment_validation($request)){
            $this->check_article_comment_match($article_comment,$creator);
            $article_comment->update(['visibility'=>($request->visibility==1)?TRUE:FALSE]);
            echo $article_comment->visibility==1?"TRUE":"FALSE";
        }else{
            return response()->json(['massage'=>'validation error']);
        }
    }
    public function replay(Request $request,Article_comment $article_comment)
    {
        $validator=$this->replay_validation($request);
        if($validator===TRUE){
            $replay=new Article_comment_replay();
            $replay->user_id=Auth::user()->id;
            $replay->passage=$request->passage;
            $replay->article_comment_id=$article_comment->id;
            $replay->save();
            return redirect('articles/'.$article_comment->article->id.'/'.$article_comment->article->title);
        }else{
            return redirect('articles/'.$article_comment->article->id.'/'.$article_comment->article->title)->withErrors($validator);
        }
    }
    protected function create_comment_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : complete validation rules
            'creator' => 'required|max:191',
            'passage' => 'required|min:10'
        ]);
        if($validator->fails()){
            return FALSE;
        }
        return TRUE;
    }
    protected function update_comment_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : complete validation rules
            'visibility' => 'Numeric',
        ]);
        if($validator->fails()){
            return FALSE;
        }
        return TRUE;
    }
    protected function replay_validation($request)
    {
        $validator = Validator::make($request->all(), [
            // TODO : complete validation rules
            'passage' => 'required',
        ]);
        if($validator->fails()){
            return $validator;
        }
        return TRUE;
    }
    protected function check_article_match($article,$title)
    {
        if($article->title!=$title){
            abort(404,$this->mismatch_error_massage);
        }
    }
    protected function check_article_comment_match($article_comment,$creator)
    {
        if($article_comment->creator!=$creator){
            abort(404,$this->mismatch_error_massage);
        }
    }
}
