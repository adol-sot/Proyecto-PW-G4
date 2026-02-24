import { useState, useEffect } from "react";

function AddEgresos({ categorias, cerrarAddEgreso }) {

    const [fecha, setFecha] = useState("")
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
    const [monto, setMonto] = useState("")
    const [descripcion, setDescripcion] = useState("")
    
    return <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
        <button onClick={cerrarAddEgreso} className="absolute top-3 right-3 text-gray-500 hover:text-black" type="button">
            X
        </button>
        
        <h2 className="text-2xl font-bold text-center">Registrar Egreso</h2>
        <hr className="my-5"></hr>
        <form className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 xs:grid-cols-1 gap-y-2">
            <label className="ml-1">Fecha:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="date" 
            value={fecha} onChange={function(ev) { setFecha(ev.target.value) }}/>

            <label className="ml-1">Categoría:</label>
            <select className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" 
            value={categoriaSeleccionada} onChange={function(ev) { setCategoriaSeleccionada(ev.target.value) }}>
                {
                    categorias.map( function(categoria) {
                        return <option key={ categoria.id } value={categoria.id}>
                            { categoria.name }
                        </option>
                    } )
                }
            </select>

            <label className="ml-1">Monto:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="number" 
            value={monto} onChange={function(ev) { setMonto(ev.target.value) }}/>

            <label className="ml-1">Descripción:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="text" 
            value={descripcion} onChange={function(ev) { setDescripcion(ev.target.value) }}/>
        </form>

        <form className="flex justify-center">
            <button className="mt-5 bg-yellow-300 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full xs:w-full rounded-full py-2 px-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white" type="button">
                Registrar
            </button>
        </form>
    </div>
}

export default AddEgresos