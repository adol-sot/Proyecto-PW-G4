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

  const coloresCategorias = {
    Alimentos: "bg-yellow-200 text-yellow-800",
    Servicios: "bg-green-200 text-green-800",
    Transporte: "bg-blue-200 text-blue-800",
    Vivienda: "bg-purple-200 text-purple-800",
    Entretenimiento: "bg-pink-200 text-pink-800",
    Salud: "bg-red-200 text-red-800"
  };

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
    <div className="bg-white shadow rounded-xl p-6 max-w-3xl mx-auto">

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

                {/* BADGE DE CATEGORÍA */}
                <span className={`px-4 py-1 rounded-full font-semibold text-sm w-fit ${coloresCategorias[cat]}`}>
                  {cat}
                </span>

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