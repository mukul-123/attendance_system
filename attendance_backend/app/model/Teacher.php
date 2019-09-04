<?php

namespace App\model;

use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Teacher extends Authenticatable
{
    use HasApiTokens,Notifiable;
    
    protected $fillable=['name','email','password','qualification','age','address','mobile_number',
    'grade_id','verify_token','created_at'];

    public function class(){
        return $this->belongsTo('App\model\Grade','grade_id','id')->select('id','name');
    }

}
