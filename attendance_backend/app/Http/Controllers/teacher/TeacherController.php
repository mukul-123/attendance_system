<?php

namespace App\Http\Controllers\teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherRequest;

use Illuminate\Support\Facades\Auth;

use App\model\Teacher;

class TeacherController extends Controller
{

    public function login(TeacherRequest $request){
        $req_data=$request->all();

        if (Auth::attempt($req_data)) {
            $user=Auth::user();

                    if($req_data['verify_token'] && !empty($req_data['verify_token'])){

                        Teacher::where(['type'=>'1','verify_token'=>$req_data['verify_token']])->update(['verify'=>'1','verified_at'=>now()]);

                        $response=array('status'=>200,'data'=>$user,'message'=>'Teacher verified successfully',
                        'authorization'=>$user->createToken('MyApp')->accessToken);
                    }
                    else{
                        $response=array('status'=>200,'data'=>$user,'message'=>'Login Success','authorization'=>$user->createToken('MyApp')->accessToken);
                    }
                    return response($response,200);   
                }
        else{
            $response=array('status'=>201,'message'=>'Invalid Login');
            return response($response,200);
       }
    }
}
