<?php

namespace App\Http\Controllers;

use App\appModels\Category;
use App\appModels\Tag;
use App\articleModels\Article;
use App\Http\Requests\ArticleEditRequest;
use App\Http\Requests\TagCreateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    protected $mismatch_error_massage='عدم تطابق اطلاعات ورودی با پایگاه داده.';

    public function __construct()
    {
        parent::__construct();

        $this->middleware(['auth','writer']);

        $this->middleware('can:index,article',
                ['except'=>
                    [
                        'index','create'
                    ],
                ]
        );
    }
    public function index(){
        $articles=Auth::user()->articles;
        return view('user.writer.articles.index',compact('articles'));
    }
    public function edit(Article $article,$title)
    {
        $this->check_article_match($article,$title);
        $tags=Tag::all();
        $categories=Category::all();
        return view('user.writer.articles.edit',compact('article','tags','categories'));
    }
    public function update(ArticleEditRequest $request,Article $article,$title)
    {
        $this->check_article_match($article,$title);
        $article->update([
            'title'=>$request->title,
            'passage'=>$request->passage
        ]);
        $article->tags()->sync($request->tags);
        $article->categories()->sync($request->categories);
        massage()->success('به روز رسانی مقاله','مقاله به روزرسانی گردید');
        return redirect('user/writer/articles/edit/'.$article->id.'/'.$article->title);
    }
    public function create()
    {
        Auth::user()->articles()->create([
            'title'=>'----',
            'passage'=>'----'
        ]);
        massage()->success('ایجاد مقاله جدید','مقاله جدید با موفقیت ایجاد گردید،جهت ویرایش لینک مورد نظر را کلیک نمایید.');
        return redirect('user/writer/articles/');
    }
    public function delete(Article $article)
    {
        $article->delete();
        massage()->warning('حذف مقاله','مقاله مورد نظر حذف گردید');
        return redirect('user/writer/articles');
    }
    public function createTags(TagCreateRequest $request,Article $article)
    {
        $tags=$request->tags;
        $tagsArray=explode(',',$tags);
        foreach($tagsArray as $tag){
            if(Tag::all()->contains('name',trim($tag))){
                continue;
            }
            Tag::create([
                'name'=>trim($tag)
            ]);
        }
        massage()->success('به روز رسانی اطلاعات','برچسب مورد نظر ایجاد');
        return redirect('user/writer/articles/edit/'.$article->id.'/'.$article->title);
    }
    protected function check_article_match($article,$title)
    {
        if($article->title!=$title){
            abort(404,$this->mismatch_error_massage);
        }
    }
}
