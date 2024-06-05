import React from "react";


export default function CodigoPostal() {
    return (
        <div className="grid size-3/12 justify-center">
            <label className="block text-gray-900" htmlFor="codigo-postal">Introduce tu código postal</label>
            <input type="text" id="codigo-postal" name="codigo-postal" placeholder="12345" className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-black"/>
        </div>
    )
}