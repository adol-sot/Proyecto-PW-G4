import { useState } from "react";

function PresupuestoCategoria({ egresos }) {

  const categorias = [
    "Alimentos",
    "Servicios",
    "Transporte",
    "Vivienda",
    "Entretenimiento",
    "Salud"
  ];

  const [presupuestos, setPresupuestos] = useState({
    Alimentos: "",
    Servicios: "",
    Transporte: "",
    Vivienda: "",
    Entretenimiento: "",
    Salud: ""
  });

  function cambiarPresupuesto(categoria, valor) {
    setPresupuestos({
      ...presupuestos,
      [categoria]: valor
    });
  }

  function calcularTotal(categoria) {
    return egresos
      .filter(egreso => egreso.categoria === categoria)
      .reduce((total, egreso) => total + egreso.monto, 0);
  }

  return (
    <div className="
      bg-white shadow rounded-xl p-4 mt-6
      max-w-3xl
      mx-auto
    ">

      <h2 className="text-lg font-bold text-center mb-6">
        Presupuesto mensual por categoría
      </h2>

      <div className="space-y-6">

        {categorias.map(cat => {

          const totalGastos = calcularTotal(cat);
          const presupuestoNumero = Number(presupuestos[cat] || 0);
          const diferencia = presupuestoNumero - totalGastos;

          return (
            <div key={cat} className="border rounded-xl p-4">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="font-semibold text-lg">
                  {cat}
                </div>

                <input
                  type="number"
                  placeholder="Ingrese presupuesto"
                  value={presupuestos[cat]}
                  onChange={e => cambiarPresupuesto(cat, e.target.value)}
                  className="border p-2 rounded-xl w-full sm:w-48"
                />

              </div>

              <div className="mt-3 text-sm">

                <p>
                  Total gastado: <strong>S/ {totalGastos}</strong>
                </p>

                {presupuestos[cat] !== "" && (
                  <p className={`font-bold ${
                    diferencia >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    Disponible: S/ {diferencia}
                  </p>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default PresupuestoCategoria;