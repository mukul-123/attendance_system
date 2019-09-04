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
                'con_pwd'=>'required_with:password|same:password',
                'address'=>'required',
                'class'=>'required|numeric',
                'qualification'=>'required',
                'age'=>'required|numeric|',
                'mob_no'=>'required|numeric'
             ];
    }

    // public function messages()
    // {
    // }

    public function failedValidation(Validator $validator) {
        $errors=$validator->errors()->toArray();
        foreach($errors as $error){
            $response=['status'=>422,'message'=>$error[0]];
        }
         throw new HttpResponseException(response($response,422));
         }
}
