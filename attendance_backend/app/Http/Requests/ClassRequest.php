<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ClassRequest extends FormRequest
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
                'class'=>'required|exists:grade,id',
        ];
    }


    public function messages()
    {
        return [
            'class.required'=>'Class is required',
            'class.exists'=>'This class does not exist.',
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
