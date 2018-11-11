<?php

namespace App\AppDirectory\db_initializers;


use App\appModels\Category;

class category_initialize
{
    public static $category_name=[
        'news'=>'اخبار خودرو',
        'new_cars'=>'جدیدترین ها',
        'soon'=>'به زودی دربازار',
        'technology'=>'تکنولوژی',
        'fastest'=>'سریع ترین ها',
        'strongest'=>'پرقدرت ترین ها',
        'sports'=>'ماشین اسپورت',
    ];

    public static function get_category_create_array()
    {
        $all_categories=[];
        foreach (self::$category_name as $name => $description)
        {
            $all_categories[]=
                [
                    'name'=>$name,
                    'description'=>$description
                ];
        }
        return $all_categories;
    }

    public static function Action()
    {
        foreach (self::get_category_create_array() as $record){
            Category::create($record);
        }
    }

}
