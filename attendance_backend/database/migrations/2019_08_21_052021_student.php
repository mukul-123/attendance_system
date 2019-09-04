<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Student extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students',function(Blueprint $table){
            $table->increments('id');
            $table->unsignedInteger('teacher_id');
            $table->string('name');
            $table->string('father_name');
            $table->string('email');
            $table->integer('number');
            $table->integer('parents_number');
            $table->string('address');
            $table->unsignedInteger('grade_id');
            $table->integer('verify_code');
            $table->boolean('verify');
            $table->dateTime('verified_at');
            $table->timestamps();
        });
        Schema::table('students',function(Blueprint $table){
            $table->foreign('teacher_id')->references('id')->on('teachers')->onDelete('cascade');
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
        Schema::drop('students');
    }
}
