import { useState } from "react";

function PresupuestoCategoria({ egresos }) {

  const [categoria, setCategoria] = useState("");
  const [presupuesto, setPresupuesto] = useState("");

  // Filtrar gastos por categoría seleccionada
  const gastosCategoria = egresos.filter(
    egreso => egreso.categoria === categoria
  );

  // Sumar montos
  const totalGastos = gastosCategoria.reduce(
    (total, egreso) => total + egreso.monto,
    0
  );

  const diferencia = presupuesto - totalGastos;

  return (
    <div className="bg-white shadow rounded p-4 mt-8 ml-10">

      <h2 className="text-lg font-bold mb-4">
        Presupuesto mensual por categoría
      </h2>

      {/* Seleccionar categoría */}
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        className="border p-2 rounded-xl w-2xl mb-4"
      >
        <option>Alimentos</option>
        <option>Servicios</option>
        <option>Transporte</option>
        <option>Vivienda</option>
      </select>

      {/* Presupuesto */}
      <input
        type="number"
        placeholder="Ingrese su presupuesto"
        value={presupuesto}
        onChange={e => setPresupuesto(e.target.value)}
        className="border p-2 rounded-xl w-2xl mb-4 ml-5"
      />

      <p>Total gastado: <strong>S/ {totalGastos}</strong></p>

      <p
        className={`mt-2 font-bold ${
          diferencia >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        Comparacion: S/ {diferencia}
      </p>

    </div>
  );
}

export default PresupuestoCategoria;
