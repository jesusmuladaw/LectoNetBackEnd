<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:70'],
            'apellidos' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'edad' => ['nullable', 'integer'],
            'descripcion' => ['nullable', 'string', 'max:400'],
            'pais_id' => ['nullable', 'exists:pais_id'],
            'ciudad_id' => ['nullable', 'exists:ciudad_id'],
            'foto' => ['nullable'],
        ];
    }
}
