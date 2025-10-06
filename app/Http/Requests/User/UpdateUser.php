<?php
namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @property \App\Models\User $user
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', Rule::unique('users')->ignore($this->user->id)],
            'number'   => ['required', 'string', 'regex:/^\+?[0-9]{7,15}$/'],
            'role'     => ['required'],
            'password' => ['sometimes', 'nullable', 'string', 'min:6', 'confirmed'],
        ];
    }
    public function messages()
    {
        return [
            'name.required'      => 'Please enter your name.',
            'name.string'        => 'The name must be a valid string.',
            'name.max'           => 'The name may not be greater than 255 characters.',
            'email.required'     => 'Please enter your email address.',
            'email.email'        => 'Please enter a valid email address.',
            'email.unique'       => 'This email address is already taken.',
            'number.required'    => 'The phone number is required.',
            'number.string'      => 'The phone number must be a valid string.',
            'number.regex'       => 'The phone number format is invalid. It should contain only numbers and may start with +.',
            'role.required'      => 'Please select a role.',
            'password.string'    => 'The password must be a valid string.',
            'password.min'       => 'The password must be at least 6 characters.',
            'password.confirmed' => 'The password confirmation does not match.',
        ];
    }
}
