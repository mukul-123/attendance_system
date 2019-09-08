<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Attendance extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attendance',function(Blueprint $table){
            $table->increments('id');
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('teacher_id');
            $table->enum('availability',[0,1]);
            $table->timestamps();
        });
 
        Schema::table('attendance',function(Blueprint $table){
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
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
        Schema::drop('attendance');
    }
}
