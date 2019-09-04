<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Teacher extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachers',function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->string('qualification');
            $table->integer('age');
            $table->string('address');
            $table->string('image')->nullable();
            $table->bigInteger('mobile_number');
            $table->enum('type',[0,1])->default('1');
            $table->unsignedInteger('grade_id')->nullable();
            $table->timestamps();
        });
 
        Schema::table('teachers',function(Blueprint $table){
            $table->foreign('grade_id')->references('id')->on('grade')->onDelete('cascade');
        }); 
       }    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('teachers');
    }
}
