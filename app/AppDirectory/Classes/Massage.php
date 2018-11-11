<?php

namespace App\AppDirectory\Classes;


class Massage
{

    protected $type=NULL;
    protected $title=NULL;
    protected $passage=NULL;

    protected function addTitle($title='title')
    {
        $this->title=$title;
        return $this;
    }
    protected function addType($type='type')
    {
        $this->type=$type;
        return $this;
    }
    protected function addPassage($massage='massage')
    {
        $this->passage=$massage;
        return $this;
    }
    protected function submit()
    {
        if($this->type!=NULL && $this->title!=NULL && $this->passage!=NULL){
            $name=$this->type;
            session()->flash($name,['title'=>$this->title,'passage'=>$this->passage]);
        }
    }
    public function error($title,$passage)
    {
        $this->addType('error')->addTitle($title)->addPassage($passage)->submit();
    }
    public function info($title,$passage)
    {
        $this->addType('info')->addTitle($title)->addPassage($passage)->submit();
    }
    public function warning($title,$passage)
    {
        $this->addType('warning')->addTitle($title)->addPassage($passage)->submit();
    }
    public function success($title,$passage)
    {
        $this->addType('success')->addTitle($title)->addPassage($passage)->submit();
    }
}