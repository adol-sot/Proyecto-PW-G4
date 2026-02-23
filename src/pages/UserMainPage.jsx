import { useState, useEffect } from "react";
import ListadoEgresos from "../components/ListadoEgresos";
import Navegacion from "../components/Navegacion";
import PresupuestoCategoria from "../components/PresupuestoCategoria";
import FiltrarGraficoEgreso from "./FiltrarGraficoEgreso";
import FormularioEditarEgreso from "../components/FormularioEditarEgreso";
import AddEgresos from "../components/AddEgresos";

function UserMainPage() {

  const [mostrarAddEgreso, setMostrarAddEgreso] = useState(false)
  const [mostrarGrafico, setMostrarGrafico] = useState(false)
  const [egresos, setEgresos] = useState([])
  const [egresoEnEdicion, setEgresoEnEdicion] = useState(null)

  useEffect(() => {async function obtenerEgresos() {
    try {
      const token = localStorage.getItem("TOKEN")
      const userId = localStorage.getItem("USER_ID")

      const response = await fetch(`http://localhost:8000/egresos/usuario/${userId}`,
        {
          headers: {
            "x-token": token
          }
        }
      )

      const data = await response.json()
      setEgresos(data.data)

    } catch (error) {
      console.error("Error al obtener egresos:", error)
    }
  }

  obtenerEgresos()
}, [])

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
            <ListadoEgresos egresos={egresos} onEditar={manejarEditar} abrir={function(){setMostrarGrafico(true)}} abrirAddEgresos={function(){setMostrarAddEgreso(true)}}/>
        </div>

        {mostrarGrafico && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <FiltrarGraficoEgreso cerrar={function() {setMostrarGrafico(false)}}/>
          </div>
        )}

        {mostrarAddEgreso && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <AddEgresos cerrarAddEgreso={function(){setMostrarAddEgreso(false)}}/>
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