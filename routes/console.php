<?php

use App\AppDirectory\db_initializers\category_initialize;
use App\AppDirectory\db_initializers\db_initializer;
use App\AppDirectory\db_initializers\logos_initialize;
use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/



Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');




Artisan::command('init_database', function () {
    try{
        db_initializer::make(TRUE);
        category_initialize::Action();
        logos_initialize::Action();
        $this->comment("the initialization was completed successfully.");
    }
    catch (Exception $exp){
        $this->comment("an error was happen please try again!");
        $this->comment($exp);
    }
})->describe('initializing database needing tables for garage project');