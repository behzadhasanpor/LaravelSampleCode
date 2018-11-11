<?php

namespace App\AppDirectory\db_initializers;


use App\carModels\Brand;
use PhpParser\Node\Scalar\MagicConst\Dir;

class logos_initialize
{
    protected $localBasePath='images'.DIRECTORY_SEPARATOR.'brands'.DIRECTORY_SEPARATOR;
    protected function logoDir()
    {
        return public_path().DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'brands'.DIRECTORY_SEPARATOR;
    }
    protected function getLogoArrayNames()
    {
        $names=
            glob($this->logoDir()."*-logo.{jpg,gif,png}",
            GLOB_BRACE);
        $names=array_map(function ($str){
            $pos1=strpos($str,$this->localBasePath)+strlen($this->localBasePath);
            $pos2=strpos($str,'-logo');
            return substr($str,$pos1,$pos2-$pos1);
        },$names);
        return $names;
    }
    protected function getLogoArrayPath(){
        $names=
            glob($this->logoDir()."*-logo.{jpg,gif,png}",
                GLOB_BRACE);
        $names=array_map(function ($str){
            $pos1=strpos($str,$this->localBasePath);
            return substr($str,$pos1);
        },$names);
        return $names;
    }


    public function LogoArray(){
        return array_combine(
            $this->getLogoArrayNames()
            ,
            $this->getLogoArrayPath()
        );
    }
    public static function Action()
    {
        Brand::truncate();
        $instance=new self;
        foreach ($instance->LogoArray() as $name => $image_path){
            Brand::create([
                'name'=>$name,
                'image_path'=>$image_path
            ]);
        }
    }
}