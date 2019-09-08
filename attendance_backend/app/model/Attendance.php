<?php

namespace App\model;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $table="attendance";
    protected $fillable=['student_id','teacher_id','grade_id','availability'];

}
