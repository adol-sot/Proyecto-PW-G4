import { useState, useEffect } from "react";

async function editarEgreso(egresoId, datosEgreso) {
  const token = localStorage.getItem("TOKEN");

  const response = await fetch(`http://localhost:8000/egresos/editar/${egresoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-token": token
    },
    body: JSON.stringify(datosEgreso),
  });

  if (!response.ok) {
    throw new Error("Error al editar egreso");
  }

  return await response.json();
}

function FormularioEditarEgreso({ categorias, egreso, onGuardar, onCancelar }) {

  const [expense_date, setExpenseDate] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [is_recurring, setIsRecurring] = useState(false);

  useEffect(() => {
    if (egreso) {
      setExpenseDate(egreso.expense_date?.split("T")[0] || "");
      setDescription(egreso.description || "");
      setCategoryId(egreso.category_id || "");
      setAmount(egreso.amount || "");
      setIsRecurring(egreso.is_recurring ?? false);
    }
  }, [egreso]);

  const manejarGuardar = async () => {
  try {
    await editarEgreso(egreso.id, {
      amount: Number(amount),
      expense_date: expense_date,
      description: description,
      category_id: category_id,
      is_recurring: is_recurring
    });

    onGuardar({
      expense_date,
      description,
      category_id,
      amount,
      is_recurring
    });

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
              value={expense_date}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Categoría</label>
            <select
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Monto</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={manejarGuardar}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
          <button
            onClick={onCancelar}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularioEditarEgreso;