<?php

namespace App\model;

use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use \Crypt;

class Teacher extends Authenticatable
{
    use HasApiTokens,Notifiable;

    protected $fillable=['name','email','password','qualification','age','address','mobile_number',
    'grade_id','verify_token','created_at'];

    public function class(){
        return $this->belongsTo('App\model\Grade','grade_id','id')->select('id','name');
    }

    public function getImageAttribute($image)
    {
        if($image){
            $image = asset('storage/images/'.$image);
        } else{
            $image = asset('storage/images/male_teacher.png');
        }
        return ($image);
    }

}
