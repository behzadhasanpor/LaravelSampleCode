<?php

namespace App\Http\Controllers;

use App\appModels\Tag;
use App\Http\Requests\TagCreateRequest;
use Illuminate\Http\Request;

class TagController extends Controller
{



    public function create(TagCreateRequest $request)
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
        return redirect('user/photographer');
    }
}
