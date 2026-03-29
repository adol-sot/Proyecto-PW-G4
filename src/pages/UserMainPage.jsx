import { useState, useEffect } from "react";
import ListadoEgresos from "../components/ListadoEgresos";
import Navegacion from "../components/Navegacion";
import FiltrarGraficoEgreso from "./FiltrarGraficoEgreso";
import FormularioEditarEgreso from "../components/FormularioEditarEgreso";
import AddEgresos from "../components/AddEgresos";

function UserMainPage() {

  const [mostrarAddEgreso, setMostrarAddEgreso] = useState(false)
  const [mostrarGrafico, setMostrarGrafico] = useState(false)
  const [egresos, setEgresos] = useState([])
  const [egresoEnEdicion, setEgresoEnEdicion] = useState(null)
  const [categorias, setCategorias] = useState([])

  async function obtenerEgresos() {
    try {
      const token = localStorage.getItem("TOKEN")
      const userId = localStorage.getItem("USER_ID")

      const response = await fetch(`https://proyecto-pw-g4-backend-1.onrender.com/egresos/usuario/${userId}`, {
        headers: {
          "x-token": token
        }
      })

      const data = await response.json()
      setEgresos(data.data)

    } catch (error) {
      console.error("Error al obtener egresos:", error)
    }
  }

  useEffect(() => {
    obtenerEgresos()
  }, [])

  const manejarEditar = (egreso) => {
    setEgresoEnEdicion(egreso);
  };

  const EditarGuardar = async () => {
    try {
      await obtenerEgresos();
      setEgresoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar lista:", error);
    }
  };

  const EditarCancelar = () => {
    setEgresoEnEdicion(null);
  };

  async function obtenerCategoriasHTTP() {
    const URL = "https://proyecto-pw-g4-backend-1.onrender.com/categorias/"
    const response = await fetch(URL, {
      headers: {
        "x-token": localStorage.getItem("TOKEN")
      }
    })

    if (!response.ok) {
      console.log("Error de petición. " + response.status)
      return
    }

    const data = await response.json()
    setCategorias(data.data)
  }

  async function RegistrarEgreso(fecha, categoriaSeleccionada, monto, descripcion) {
    const URL = "https://proyecto-pw-g4-backend-1.onrender.com/egresos/crear"
    const userId = localStorage.getItem("USER_ID")

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        amount: monto,
        expense_date: fecha,
        description: descripcion,
        user_id: userId,
        category_id: categoriaSeleccionada
      }),
      headers: {
        "x-token": localStorage.getItem("TOKEN"),
        "content-type": "application/json"
      }
    })

    if (!response.ok) {
      console.log("Error de petición. " + response.status)
      return
    }

    obtenerEgresos()
  }

  useEffect(function () {
    obtenerCategoriasHTTP()
  }, [])

  return (
    <div className="min-h-screen bg-blue-900 relative">

      <Navegacion />

     

      {/* LISTADO DE EGRESOS */}
      <div className="p-8">
        <ListadoEgresos
          egresos={egresos}
          onEditar={manejarEditar}
          abrir={() => setMostrarGrafico(true)}
          abrirAddEgresos={() => setMostrarAddEgreso(true)}
        />
      </div>

      {mostrarGrafico && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <FiltrarGraficoEgreso cerrar={() => setMostrarGrafico(false)} />
        </div>
      )}

      {mostrarAddEgreso && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <AddEgresos
            categorias={categorias}
            cerrarAddEgreso={() => setMostrarAddEgreso(false)}
            OnRegistroEgreso={RegistrarEgreso}
          />
        </div>
      )}

      {egresoEnEdicion && (
        <FormularioEditarEgreso
          categorias={categorias}
          egreso={egresoEnEdicion}
          onGuardar={EditarGuardar}
          onCancelar={EditarCancelar}
        />
      )}

    </div>
  )
}

export default UserMainPage