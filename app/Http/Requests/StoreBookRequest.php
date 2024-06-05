<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'foto' => 'nullable|image|max:20480',
            'idioma_id' => 'required|exists:idiomas,id',
            'categoria_id' => 'required|exists:categorias,id',
            'genero_id' => 'required|exists:generos,id',
            'tematica_id' => 'required|exists:tematicas,id',
        ];
    }
    public function messages()
    {
        return [
            'titulo.required' => 'El título es obligatorio.',
            'autor.required' => 'El autor es obligatorio.',
            'foto.image' => 'La foto debe ser una imagen.',
            'foto.max' => 'La foto no debe ser mayor a 2MB.',
        ];
    }
}
