<?php

namespace App\AppDirectory\Classes;


class Visit
{

    protected $table_ins=NULL;

    public function set()
    {
        if( ! $this->validate())
            return NULL;
        if( ! $this->check()){
            $this->table_ins->visits()->create([
                'ip'=>$_SERVER['REMOTE_ADDR']
            ]);
            return TRUE;
        }
        return NULL;
    }
    public function getVisitNumber(){
        if( ! $this->validate())
            return NULL;
        return count($this->table_ins->visits);
    }
    public function check()
    {
        if( ! $this->validate())
            return NULL;
        return (isset($_SERVER['REMOTE_ADDR']) && ! $this->table_ins->isVisitedMe($_SERVER['REMOTE_ADDR']))?FALSE:TRUE;
    }
    public function car($car){
        $this->table_ins=$car;
        return $this;
    }
    public function article($article){
        $this->table_ins=$article;
        return $this;
    }
    public function tag($tag){
        $this->table_ins=$tag;
        return $this;
    }
    public function user($user){
        $this->table_ins=$user;
        return $this;
    }
    protected function validate(){
        return ($this->table_ins!=NULL)?TRUE:FALSE;
    }
}