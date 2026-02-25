import { useState, useEffect } from "react";
import PresupuestoCategoria from "../components/PresupuestoCategoria";
import Navegacion from "../components/Navegacion";

function PresupuestoPage() {

  const [egresos, setEgresos] = useState([]);

  async function obtenerEgresos() {
    try {
      const token = localStorage.getItem("TOKEN");
      const userId = localStorage.getItem("USER_ID");

      const response = await fetch(
        `https://proyecto-pw-g4-backend-1.onrender.com/egresos/usuario/${userId}`,
        {
          headers: {
            "x-token": token
          }
        }
      );

      const data = await response.json();
      setEgresos(data.data);

    } catch (error) {
      console.error("Error al obtener egresos:", error);
    }
  }

  useEffect(() => {
    obtenerEgresos();
  }, []);

  return (
    <div className="min-h-screen bg-blue-900">
      <Navegacion />
      <div className="p-8">
        <PresupuestoCategoria egresos={egresos} />
      </div>
    </div>
  );
}

export default PresupuestoPage;