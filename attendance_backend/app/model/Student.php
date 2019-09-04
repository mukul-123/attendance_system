<?php

namespace App\model;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable=['name','teacher_id','email','father_name','number','parents_number','verify_code',
    'address','grade_id','created_at'];

    public function class(){
        return $this->belongsTo('App\model\Grade','grade_id','id');
    }

    public function attendance(){
        return $this->hasMany('App\model\Attendance');
    }
}
