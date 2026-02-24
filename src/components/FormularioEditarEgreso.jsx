import { useEffect, useState } from "react";
import { func } from "prop-types";

async function editarEgreso(usuarioId, egresoId, datosEgreso) { 

  
    const response = await fetch(`http://localhost:8000/egresos/editar/${egresoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEgreso),
    });

    if (!response.ok) {
        throw new Error("Error al editar egreso");
    }

    return await response.json();
}

function FormularioEditarEgreso({ categorias, egreso, egresoId, usuarioId, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    fecha: egreso.fecha,
    descripcion: egreso.descripcion,
    categoria: egreso.categoria,
    monto: egreso.monto
  });
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")


  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarGuardar = async () => {
    if (!formData.fecha || !formData.descripcion || !formData.categoria || !formData.monto) {
      alert("Por favor completa todos los campos");
      return;
    }
    
    try {
      await editarEgreso(usuarioId, egresoId, formData);
      onGuardar(formData);
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Egreso</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={manejarCambio}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={manejarCambio}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Categoría</label>
            <select
              name="categoria"
              value={categoriaSeleccionada}
              onChange={function(ev) { setCategoriaSeleccionada(ev.target.value) }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
              {
                    categorias.map( function(categoria) {
                        return <option key={ categoria.id } value={categoria.id}>
                            { categoria.name }
                        </option>
                    } )
                }
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Monto</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={manejarCambio}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={manejarGuardar}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Guardar
          </button>
          <button
            onClick={onCancelar}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularioEditarEgreso;
