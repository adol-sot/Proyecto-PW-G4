import { useState } from "react";
import ListadoEgresos from "../components/ListadoEgresos"
import Navegacion from "../components/Navegacion"
import PresupuestoCategoria from "../components/PresupuestoCategoria";
import FiltrarGraficoEgreso from "./FiltrarGraficoEgreso";
import FormularioEditarEgreso from "../components/FormularioEditarEgreso";
import AddEgresos from "../components/AddEgresos";


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
    const [egresos, setEgresos] = useState(listaEgresos);
    const [egresoEnEdicion, setEgresoEnEdicion] = useState(null);

    const manejarEditar = (egreso) => {
      setEgresoEnEdicion(egreso);
    };

    const EditarGuardar = (formData) => {
      const egresosActualizados = egresos.map(egreso => 
        egreso === egresoEnEdicion 
          ? {
              ...egreso,
              fecha: formData.fecha,
              descripcion: formData.descripcion,
              categoria: formData.categoria,
              monto: Number(formData.monto)
            }
          : egreso
      );

      setEgresos(egresosActualizados);
      setEgresoEnEdicion(null);
    };

    const EditarCancelar = () => {
      setEgresoEnEdicion(null);
    };

    return <div className="min-h-screen bg-blue-900 relative">
        <Navegacion />
        <div className="p-8 ">
            <AddEgresos />
            <ListadoEgresos egresos={egresos} onEditar={manejarEditar} />
        </div>

        <div className="flex justify-center">
            <button
                type="button"
                onClick={function(){setMostrarGrafico(true)}}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-black">
                Ver gráfico de egresos
            </button>
        </div>

        {mostrarGrafico && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <FiltrarGraficoEgreso egresos={egresos} cerrar={function() {setMostrarGrafico(false)}}/>
          </div>
        )}

        <div className="p-8">
            <PresupuestoCategoria egresos={egresos} />
        </div>

        {egresoEnEdicion && (
          <FormularioEditarEgreso 
            egreso={egresoEnEdicion} 
            onGuardar={EditarGuardar} 
            onCancelar={EditarCancelar}
          />
        )}
    </div>
}

export default UserMainPage