<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StudentRegisterRequest extends FormRequest
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
            'email'=>'required|email|unique:students',
            'address'=>'required',
            'class'=>'required|numeric',
            'fath_name'=>'required',
            'fath_number'=>'required|numeric|min:10',
            'name'=>'required'
        ];
    }

    public function messages()
    {
        return [
            'email.required'=>'Email is required',
            'email.email'=>'Invalid email address',
            'address.required'=>'Address is required',
            // 'address.alpha'=>'Address must contain letters',
            'class.required'=>'Class is required',
            'class.numeric'=>'Class name is invalid',
            'fath_name.required'=>'Father name is required',
            // 'fath_name.alpha'=>'Father name must contain letters',
            'fath_number.required'=>'Father number is required',
            'fath_number.numeric'=>'Father number must be a number',
            'fath_number.min'=>'Mobile number should be a valid number',
            'name.required'=>'Student name is required',
            // 'name.string'=>'Student name must contain letters'
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
