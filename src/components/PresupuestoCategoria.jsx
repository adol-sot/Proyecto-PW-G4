import { useState } from "react";

function PresupuestoCategoria({ egresos }) {

  const [categoria, setCategoria] = useState("");
  const [presupuesto, setPresupuesto] = useState("");

  const gastosCategoria = egresos.filter(
    egreso => egreso.categoria === categoria
  );

  const totalGastos = gastosCategoria.reduce(
    (total, egreso) => total + egreso.monto,
    0
  );

  const diferencia = presupuesto - totalGastos;

  return (
    <div className="
      bg-white shadow rounded-xl p-4 mt-6
      grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-2
      gap-4
      max-w-3xl
      mx-auto
    ">

      {/* Título */}
      <h2 className="text-lg font-bold text-center sm:col-span-2 md:col-span-2">
        Presupuesto mensual por categoría
      </h2>

      {/* Categoría */}
      <div className="col-span-1">
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="border p-2 rounded-xl w-full"
        >
          <option>Alimentos</option>
          <option>Servicios</option>
          <option>Transporte</option>
          <option>Vivienda</option>
        </select>
      </div>

      {/* Presupuesto */}
      <div className="col-span-1">
        <input
          type="number"
          placeholder="Ingrese su presupuesto"
          value={presupuesto}
          onChange={e => setPresupuesto(e.target.value)}
          className="border p-2 rounded-xl w-full"
        />
      </div>

      {/* Total gastado */}
      <p className="text-center sm:col-span-2 md:col-span-2">
        Total gastado: <strong>S/ {totalGastos}</strong>
      </p>

      {/* Comparación */}
      <p
        className={`font-bold text-center sm:col-span-2 md:col-span-2 ${
          diferencia >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        Comparación: S/ {diferencia}
      </p>

    </div>
  );
}

export default PresupuestoCategoria;
