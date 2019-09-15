<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;

class UpdateProfileRequest extends FormRequest
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
        $id=Input::get('id');


        return [
            'id'=>'required|exists:teachers',
            'name'=>'required',
            'email'=>'required|email|unique:teachers,email,'.$id,
        ];
    }

    public function messages()
    {
        return [
        'id.required'=>'User id is required',
        'id.exists'=>'Invalid user id',
        'name.required'=>'Name is required',
        'email.required'=>'Email is required',
        'email.email'=>'Invalid email address',
        'email.unique'=>'Email already exists',
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
