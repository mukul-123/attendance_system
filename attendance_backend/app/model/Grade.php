<?php

namespace App\model;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $table="grade";
    protected $fillable=['name'];

    public function students(){
        return $this->hasMany('App\model\Student');
    }

    public function class(){
        return $this->hasOne('App\model\Teacher');
    }

    public function attendances(){
        return $this->hasMany('App\model\Attendance');
    }
}
