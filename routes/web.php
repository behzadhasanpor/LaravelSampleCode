<?php

use App\appModels\Category;

Route::group(['prefix'=>'user'],function (){

        Auth::routes();

        Route::group(['prefix'=>'roles'],function (){
            Route::get('/','RoleController@index');
            Route::patch('/','RoleController@update');
            Route::post('add/{user_role_request}','RoleController@add');
            Route::post('abort/{user_role_request}','RoleController@abort');
        });


        Route::group(['prefix'=>'admin'],function (){
            Route::get('user_role_requests','AdminController@user_role_requests');
        });

        Route::group(['prefix'=>'writer'],function (){

            Route::group(['prefix' => 'cars'], function ()
            {
                        Route::get('/','CarController@cars');
                        Route::get('/ajax','CarController@ajax_cars');
                        Route::post('/','CarController@create');
                        Route::get('/{car}/{name}','CarController@edit');
                        Route::post('/{car}','CarController@update');
                        Route::delete('/{car}/{name}','CarController@delete');
                        Route::post('/add_image/{car}/{name}','CarController@add_image');
                    });

            Route::group(['prefix' => 'articles'], function () {
                    Route::get('/','ArticleController@index');
                    Route::post('/','ArticleController@create');
                    Route::patch('/{article}/{title}','ArticleController@update');
                    Route::delete('/{article}','ArticleController@delete');
                    Route::get('/edit/{article}/{title}','ArticleController@edit');
                    Route::post('tags/{article}','ArticleController@createTags');
            });
        });

        Route::group(['prefix' => 'photographer'], function () {
                Route::get('/', 'ImageController@index');
                Route::get('/ajax', 'ImageController@ajax_images');
                Route::post('/', 'ImageController@create');
                Route::delete('/{image}/{name}', 'ImageController@delete');
        });


        Route::group(['prefix' => 'images'], function () {
                Route::get('/','ImageController@get_collection');
        });

        Route::group(['prefix' => 'tags'], function () {
             Route::post('/','TagController@create');
        });

        Route::group(['prefix' => 'profile'], function () {
            Route::get('/','UserController@index');
            Route::patch('/','UserController@update');
            Route::patch('/image/{first_name}','UserController@update_image');
        });


});

Route::group(['prefix' => 'cars'], function () {
    Route::get('/','AppController@all_cars');
    Route::get('{car}/{name}','AppController@cars');
});

Route::group(['prefix' => 'articles'], function () {
    Route::get('{article}/{title}','AppController@articles');
    Route::group(['prefix' => 'comments'], function () {
        Route::patch('{article_comment}/{creator}','CommentController@update');
        Route::post('replay/{article_comment}','CommentController@replay');
        Route::post('{article}/{title}','CommentController@create');
    });
});

Route::group(['prefix' => 'brands'], function () {
    Route::get('','BrandController@brands')->name('brands');
    Route::get('ajax','BrandController@ajax');
    Route::get('{brand}','BrandController@index');
});

Route::group(['prefix' => 'categories'], function () {
    $categories=Category::all();
    foreach ($categories as $category){
        Route::get("/$category->description","AppController@$category->name",compact('category'))->name($category->name);
    }
});

Route::group(['prefix' => 'users'], function () {
    Route::get('/{user}/{first_name}','UserController@show');
});

Route::group(['prefix' => 'votes'], function () {
    Route::patch('/car/{car}/{name}','VoteController@update_car');
    Route::patch('/user/{user}/{first_name}','VoteController@update_user');
    Route::patch('/article/{article}/{title}','VoteController@update_article');
});

Route::get('/tags/{tag}/{name}', 'AppController@tagSearch');


Route::get('/','AppController@index')->name('root');

Route::get('/compare','AppController@compare')->name('compare');
Route::get('/workshop','AppController@workshop')->name('workshop');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/test', function () {
    $images=Auth::user()->images()->where("name","LIKE",'%%')->paginate(4);
    return response()->json($images);
});