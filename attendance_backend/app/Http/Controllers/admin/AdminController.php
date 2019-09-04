<?php

namespace App\Http\Controllers\admin;

// teacher request 
use App\Http\Requests\TeacherRequest;
// student register request 
use App\Http\Requests\StudentRegisterRequest;
// class request 
use App\Http\Requests\ClassRequest;
// teacher register request 
use App\Http\Requests\TeacherRegisterRequest;
// student verification request 
use App\Http\Requests\StudentVerificationRequest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\model\Teacher;
use App\model\Grade;
use App\model\Student;
use App\model\Attendance;
use Mail;

class AdminController extends Controller
{
       /*
       * function to login the teacher 
       */

       public function login(TeacherRequest $request){
              $req_data=$request->all();

              // validating the user credential...
              if (Auth::attempt($req_data)) {
                   $user=Auth::user();
                   $data=array('status'=>200,'data'=>$user,'authorization'=>$user->createToken('MyApp')->accessToken);
              //      return response($data,200)->header('Authorization',$user->createToken('MyApp')->accessToken);;
              return response($data,200);          
       }
               else{
                   $response=array('status'=>201,'message'=>'Invalid Login');
                   return response($response,200);
              }
       }

       /*
       * function to get the logged in user profile... 
       */
       public function profile(Request $request){
              $req=$request->all();
              $user=Auth::user();
              $response=['status'=>200,'message'=>'User fetched successfully','data'=>$user];
              return response($response,200);
       }

       /*
       * function to add the class by the admin... 
       */
       public function addClass(Request $request){
              $class_data=$request->all();

              // create a new class in grade table...
              Grade::insert($class_data);
              $response=['status'=>200,'message'=>'class Added Successfully'];
              return response($response,200);
       }

       /*
       * function to get the number of students in particular class... 
       */
       public function getClasses(Request $request){
              $classes=Grade::withCount(['students'])->orderBy('id','desc')->paginate(5);
              $response=['status'=>200,'message'=>'classes fetched successfully','class'=>$classes];
              return response($response,200);
       }

       /*
       * function to get all the classes... 
       */
       public function getAllClasses(Request $request){

              switch($request->method){
                     // get classes for student to add a new student in a class...
                     case 'getClassesForStudent':
                     $classes=Grade::select('id','name')->orderBy('id','desc')->get();
                     break;
                     // get classes to add a teacher in a class...
                     case 'getClassesForTeacher':
                     $classes=Grade::select('id','name')->whereDoesntHave('class')->orderBy('id','desc')->get();
                     break;
              }
              $response=['status'=>200,'message'=>'classes fetched successfully','class'=>$classes];
              return response($response,200);    
       }

       /*
        * Function to remove a particular class.
        */
       public function removeClass(Request $request){
              $class_id=$request->id;
              // to delete a particular class from grade table...
              $delete=Grade::where('id',$class_id)->delete();
              if($delete){
                     $response=array('status'=>200,'message'=>'Class deleted successfully');
                     return response($response,200);
              } else{
                     $response=array('status'=>404,'message'=>'Class not found');
                     return response($response,404);
              }
       }

       /*
       * function to register a new student... 
       */
       public function studentRegister(StudentRegisterRequest $request){
              $req=$request->all();
              try{
                     // a verification code sent to student email for verifying...
                     $code=rand(10,10000);

                     $teacher_id=Teacher::where('grade_id',$req['class'])->select('id')->first();
                     $data=array('name'=>$req['name'],'code'=>$code);

                     // sending mail to student for further verification..
                     Mail::send('email',$data,function($message) use($req){
                            $message->to($req['email'],'Student verification')
                            ->subject('Student verification for addmission in xyz school');
                            $message->from('mukulkash7841@gmail.com','Mukul Kashyap');
                     });

                     // if mail fails due to some internal error...
                     if(count(Mail::failures())>0){
                            $response=array('status'=>500,'message'=>'Internal Server error');   
                            return response($response,500);
                     }
                     else{
                            $stu_data=array('name'=>$req['name'],'teacher_id'=>$teacher_id,'email'=>$req['email'],'father_name'=>$req['fath_name'],
                            'number'=>$req['mob_number'],'verify_code'=>$code,'parents_number'=>$req['fath_number'],'address'=>$req['address'],
                            'grade_id'=>$req['class'],'created_at'=>time());
                            
                            // insert a student in student table...
                            $student=Student::create($stu_data);
                            $response=array('status'=>200,'message'=>'Student created successfully'); 
                            return response($response,200);  
                     }
              }
              // if any exception occurs...
              catch(Exception $e){
                     return response($e->getMessage(),500);
              }
       }

       // function to view the students of specific class
       public function viewStudents(ClassRequest $request){
              $req_data=$request->all();

              $stu_data=Student::select('id','name','father_name','email','number','parents_number',
              'address','grade_id','created_at','verify')
              ->where('grade_id',$req_data['class'])->paginate(5);

              $clas_name=Grade::select('name')->where('id',$req_data['class'])->first();
              $response=['status'=>200,'message'=>'Student fetch successfully','class'=>$clas_name,'data'=>$stu_data];
              return response($response,200);
       }

       /*
       * function to verify the student after creation of student... 
       */
       public function verifyStudent(StudentVerificationRequest $request){
              $req=$request->all();
              $student=Student::where(['id'=>$req['s_id'],'verify_code'=>$req['code']])->update(['verify'=>'1','verified_at'=>now()]);
              if($student){
                     $response=['status'=>200,'message'=>'Student verified successfully'];
                     return (response($response,200));
              }
              else{
                     $response=['status'=>200,'message'=>'Internal server error'];
                     return (response($response,200));    
              }
       }

        /*
         *Function to add a new teacher by the admin...
        */
       public function teacherRegister(TeacherRegisterRequest $request){
              $req=$request->all();
              try{
                     // encrypted string sent on teacher email id...
                     $token=md5(rand());
                     $data=array('name'=>$req['name'],'email'=>$req['email'],'password'=>$req['password'],
                     'link'=>'http://localhost:4200/teacher/login/'.$token);

                     // to send an email on teacher email id...
                     Mail::send('teacher_email',$data,function($message) use($req){
                            $message->to($req['email'],'Teacher verification')
                            ->subject('Teacher verification for registration  in xyz school');
                            $message->from('mukulkash7841@gmail.com','Mukul Kashyap');
                     });

                     // if email does not sent due to some internal error...
                     if(count(Mail::failures())>0){
                            $response=array('status'=>500,'message'=>'Internal Server error');   
                            return response($response,500);
                     } 
                     else{
                            $data=array('name'=>$req['name'],'email'=>$req['email'],'password'=>bcrypt($req['password']),
                            'qualification'=>$req['qualification'],'age'=>$req['age'],'address'=>$req['address'],
                            'mobile_number'=>$req['mob_no'],'grade_id'=>$req['class'],'verify_token'=>$token);
                           
                            // creating a new teacher in teacher table...
                            $teacher=Teacher::create($data);
                            $response=['status'=>200,'message'=>'Teacher created successfully','teacher'=>$teacher];
                            return response($response,200);
                     }
       }
       // if any exception occurs...
              catch(Exception $e){
                     return response($e->getMessage(),500);
              }
       }
       
       /*
       *Function to show all the registered teachers to admin...
       */
       public function getTeachers(Request $request){

             $teachers=Teacher::select('id','name','email','qualification','age','grade_id','address','created_at')
             ->where(['type'=>'1'])->with(['class'])->orderBy('id','desc')->paginate(5);
             $response=['status'=>200,'message'=>'Teacher fetch successfully','data'=>$teachers];
             
              return response($response,200);
       }

       /*
        *Function to remove teacher...
        */
        public function removeTeacher(Request $request){
               $req=$request->all();
               $validate=$request->validate([
                      'id'=>'required|exists:teachers'
               ]);
              $delete=Teacher::where(['id'=>$req['id'],'type'=>'1'])->delete();
              if($delete){
                     $response=['status'=>200,'message'=>'Teacher deleted successfully'];
              }
              else{
                     $response=['status'=>500,'message'=>'Internal Server Error']; 
              }
              return response($response,200);
        }

        /*
         * function to get the attendance of student...
         */ 
        public function getAttendance(Request $request){
               $validate=$request->validate([
                      'id'=>'required|numeric|exists:grade'
               ]);
               $class_id=$request->id;

               // to get the students for attendance...
               switch($request->method){

                      case 'getStudentsForAttendance':
                      $students=Student::select('id','name','email','grade_id')
                      ->where(['grade_id'=>$class_id,'verify'=>'1'])->get();
                      $response=['status'=>200,'message'=>'Student Fetch successfully','data'=>$students];
                      break;

                      // to get the attendance of students of particular class...
                      case 'getStudentAttendance':
                      $attendance=Student::select('id','name','email','grade_id')->where(['grade_id'=>$class_id,'verify'=>'1'])
                      ->withCount('attendance')->with('class')->paginate(5);
                      $response=['status'=>200,'message'=>'Attendance Fetch successfully','data'=>$attendance];
                      break;    
               }
               return response($response,200);
            
        }
        /*
         * function to logout...
         */
       public function logout(Request $request){
              $usr=Auth::user()->token()->revoke();
              if($usr){
                     $response=['status'=>200,'message'=>'Logout successfully'];
                     return response($response,200);
              }
       }
}
