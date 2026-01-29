import { useState } from "react";
import ListadoEgresos from "../components/ListadoEgresos"
import Navegacion from "../components/Navegacion"
import PresupuestoCategoria from "../components/PresupuestoCategoria";
import FiltrarGraficoEgreso from "./FiltrarGraficoEgreso";

/*
const listaEgresos = [
    {
      fecha: "2024-06-01",
      descripcion: "Compra en supermercado",
      categoria: "Alimentos",
      monto: 350,
    },
    {
      fecha: "2024-06-03",
      descripcion: "Pago de servicios",
      categoria: "Servicios",
      monto: 120,
    },
    {
      fecha: "2024-07-02",
      descripcion: "Cena fuera",
      categoria: "Alimentos",
      monto: 180,
    },
    {
      fecha: "2024-07-05",
      descripcion: "Gasolina",
      categoria: "Transporte",
      monto: 200,
    },
    {
      fecha: "2024-08-01",
      descripcion: "Alquiler",
      categoria: "Vivienda",
      monto: 1200,
    },
    {
      fecha: "2024-08-10",
      descripcion: "Internet",
      categoria: "Servicios",
      monto: 150,
    }
] 
*/

const listaEgresos = [
    {
      fecha: "2024-06-01",
      descripcion: "Compra en supermercado",
      categoria: "Alimentos",
      monto: 350,
    },
    {
      fecha: "2024-06-03",
      descripcion: "Pago de servicios",
      categoria: "Servicios",
      monto: 120,
    },
    {
      fecha: "2024-07-02",
      descripcion: "Cena fuera",
      categoria: "Alimentos",
      monto: 180,
    },
    {
      fecha: "2024-07-05",
      descripcion: "Gasolina",
      categoria: "Transporte",
      monto: 200,
    },
    {
      fecha: "2024-08-01",
      descripcion: "Alquiler",
      categoria: "Vivienda",
      monto: 1200,
    },
    {
      fecha: "2024-08-10",
      descripcion: "Internet",
      categoria: "Servicios",
      monto: 150,
    }
  ];

function UserMainPage() {

    const [mostrarGrafico, setMostrarGrafico] = useState(false);

    function abrirGrafico() {
      setMostrarGrafico(true)
    }

    function cerrarGrafico() {
      setMostrarGrafico(false)
    }

      return <div className="min-h-screen bg-blue-900 relative">
        <Navegacion />
        <div className="p-8">
            <ListadoEgresos egresos={listaEgresos} />
            <PresupuestoCategoria egresos={listaEgresos} />
        </div>

        <div className="flex justify-center mt-6">
            <button
                type="button"
                onClick={abrirGrafico}
                className="mb-10 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Ver gráfico de egresos
            </button>
        </div>

        {mostrarGrafico ? (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <FiltrarGraficoEgreso egresos={listaEgresos} cerrar={function(){setMostrarGrafico(false)}}/>
          </div>
        ): null}
    </div>
}

export default UserMainPage