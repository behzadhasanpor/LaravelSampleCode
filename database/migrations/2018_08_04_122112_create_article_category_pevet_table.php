<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleCategoryPevetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_category', function (Blueprint $table) {

            $table->integer('article_id')->unsigned();
            $table->foreign('article_id')
                ->references('id')
                ->on('articles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onUpdate('cascade')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_category');
    }
}
