<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StudentVerificationRequest extends FormRequest
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
            's_id'=>'required|exists:students,id',
            'code'=>'required|exists:students,verify_code',
        ];
    }

    public function messages()
    {
        return [
            's_id.required'=>'Student id is required',
            's_id.exists'=>'The student id is invalid',
            'code.required'=>'The verification code is required',
            'code.exists'=>'The verification code is invalid'
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
