<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarOilTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oil_consumptions', function (Blueprint $table) {
            $table->increments('id');
            // car consumption characteristics
            $table->string('type_of_oil')->nullable();
            $table->string('inside_town_oil_consumption')->nullable();
            $table->string('outside_town_oil_consumption')->nullable();
            $table->string('hybrid_oil_consumption')->nullable();
            $table->string('tank_volume')->nullable();
            $table->string('pollution_standard')->nullable();
            $table->string('co2_production_level')->nullable();
            $table->string('security_standard')->nullable();
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
        Schema::dropIfExists('oil_consumptions');
    }
}
