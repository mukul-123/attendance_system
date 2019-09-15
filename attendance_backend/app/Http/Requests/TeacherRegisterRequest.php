<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TeacherRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
            return [
                'name'=>'required',
                'email'=>'required|email|unique:teachers',
                'password'=>'required|min:6',
                'con_pwd'=>'required|required_with:password|same:password',
                'address'=>'required',
                'class'=>'required|numeric',
                'qualification'=>'required',
                'age'=>'required|numeric|',
                'mob_no'=>'required|numeric'
             ];
    }
    

    public function messages()
    {
        return [
        'name.required'=>'Name is required',
        'email.required'=>'Email is required',
        'email.email'=>'Invalid email address',
        'email.unique'=>'Email already exists',
        'password.required'=>'Password is required',
        'password.min'=>'Password must contain six characters',
        'con_pwd.required_with'=>'Confirm password is required',
        'con_pwd.same'=>'Password and Confirm password must be same',
        'address.required'=>'Address is required',
        'class.required'=>'Class is required',
        'class.numeric'=>'Invalid class',
        'qualification.required'=>'Qualification is required',
        'age.required'=>'Age is required',
        'age.numeric'=>'Invalid age',
        'mob_no.required'=>'Mobile number is required',
        'mob_no.numeric'=>'Invalid mobile number'
        ];
    }

    public function failedValidation(Validator $validator) {
        $errors=$validator->errors()->toArray();
        foreach($errors as $error){
            $response=['status'=>422,'message'=>$error[0]];
        }
         throw new HttpResponseException(response($response,422));
         }
}
