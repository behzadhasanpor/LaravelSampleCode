<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarTechnicaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('technicals', function (Blueprint $table) {
            $table->increments('id');
            // technical information about cars
            $table->string('year_of_creation')->nullable();
            $table->string('engine')->nullable();
            $table->string('maximum_power')->nullable();
            $table->string('maximum_torque')->nullable();
            $table->string('gear')->nullable();
            $table->string('zero_to_hundred_acceleration')->nullable();
            $table->string('maximum_speed')->nullable();
            $table->string('wight')->nullable();
            $table->string('dimensionWidth')->nullable();
            $table->string('dimensionHeight')->nullable();
            $table->string('dimensionLength')->nullable();
            $table->string('distance_of_two_axis')->nullable();
            // foreign key of car
            $table->integer('car_id')->unsigned();
            $table->foreign('car_id')->references('id')->on('cars')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('technicals');
    }
}
