<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
    
//     return $request->user();
// });

Route::prefix('/admin')->group(function(){

    Route::post('/login','admin\AdminController@login');
});

Route::prefix('/teacher')->group(function(){

    Route::post('/login','teacher\TeacherController@login');
});

Route::group(['middleware'=>'auth:api'],function(){

    Route::prefix('/admin')->group(function(){

        Route::get('/profile','admin\AdminController@profile');

        Route::post('/addClass','admin\AdminController@addClass');

        Route::get('/classes','admin\AdminController@getClasses');

        Route::get('/getAllClasses','admin\AdminController@getAllClasses');

        Route::get('/removeClass','admin\AdminController@removeClass');
        
    
        Route::post('/studentRegister','admin\AdminController@studentRegister');

        Route::get('/view_students','admin\AdminController@viewStudents');

        Route::get('/student_verify','admin\AdminController@verifyStudent');

        Route::get('/getAttendanceByClass','admin\AdminController@getAttendance');


        Route::post('/addTeacher','admin\AdminController@teacherRegister');

        Route::get('/getAllTeachers','admin\AdminController@getTeachers');  

        Route::get('/removeTeacher','admin\AdminController@removeTeacher');  

        
        Route::get('/logout','admin\AdminController@logout');

});
});


