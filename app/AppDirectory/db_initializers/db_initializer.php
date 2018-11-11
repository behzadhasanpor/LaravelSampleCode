<?php

namespace App\AppDirectory\db_initializers;


use App\appModels\Permission;
use App\appModels\Permission_role;
use App\appModels\Role;
use Illuminate\Support\Facades\DB;


class db_initializer
{
    public static $roles=[
        'admin'=>'ادمین',
        'writer'=>'نویسنده',
        'scientist'=>'دانشمند',
        'photographer'=>'عکاس',
        'normal'=>'کاربر عادی',
    ];
    public static $permissions=[
        'adjust_permission'=>'توانایی اضافه ،حذف و یا تغییر در اجازه کاربران سایت',
        'adjust_users'=>'توانایی اعمال قانون کاربران',
        'adjust_articles'=>'توانایی اعمال تغییر در مقالات یا حذف آنها',
        'adjust_replays'=>'توانایی تغییر در جواب های داده شده به کاربران',
        'write_articles'=>'توانایی نوشتن و یا تغییر در مقالات خود',
        'replay_questions'=>'توانایی جواب دادن به سوالات کاربران سایت',
        'adjust_images'=>'توانایی ایجاد تغییر در تصاویر خود'
    ];
    public static $permission_role=[
        1=>[
            1,2,3,4,5,6
        ],
        2=>[
            5
        ],
        3=>[
            5,6
        ],
        4=>[
            7
        ],
    ];

    public static function make($flag=TRUE){
        if($flag===FALSE){
            return FALSE;
        }
        $role=new Role;
        $permission=new Permission;
        $permission_role=new Permission_role;
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $role->truncate();
        $permission->truncate();
        $permission_role->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        self::fullTableUsing($role,self::$roles);
        self::fullTableUsing($permission,self::$permissions);
        self::fullPermissionRoleTable($permission_role);
    }

    public static function fullTableUsing($table,$array_to_fill)
    {
        foreach ($array_to_fill as $name => $label){
            $table->create(['name'=>$name,'label'=>$label]);
        }
    }

    public static function fullPermissionRoleTable($table)
    {
        foreach (self::$permission_role as $role_id => $permission_array){
            foreach ($permission_array as $permission_id){
                $table->create(['permission_id'=>$permission_id,'role_id'=>$role_id]);
            }
        }
    }
}