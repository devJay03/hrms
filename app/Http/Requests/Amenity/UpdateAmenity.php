<?php
namespace App\Http\Requests\Amenity;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAmenity extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'         => ['required', 'string', 'max:255', Rule::unique('amenities')->ignore($this->amenity->id)],
            'description'  => 'required|string|max:1000',
            'is_available' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique'           => 'The amenity name must be unique',
            'name.required'         => 'The amenity name is required.',
            'name.string'           => 'The amenity name must be a valid string.',
            'name.max'              => 'The amenity name may not exceed 255 characters.',
            'description.required'  => 'The amenity description is required.',
            'description.string'    => 'The amenity description must be a valid string.',
            'description.max'       => 'The amenity description may not exceed 1000 characters.',
            'is_available.required' => 'Please select the availability status.',
            'is_available.boolean'  => 'The availability status must be a valid boolean value (checked or unchecked).',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_available' => $this->boolean('is_available') ? 1 : 0,
        ]);
    }
}
