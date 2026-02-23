import { useEffect, useState } from "react";
import ListadoEgresos from "../components/ListadoEgresos"
import Navegacion from "../components/Navegacion"
import PresupuestoCategoria from "../components/PresupuestoCategoria";
import FiltrarGraficoEgreso from "./FiltrarGraficoEgreso";
import FormularioEditarEgreso from "../components/FormularioEditarEgreso";
import AddEgresos from "../components/AddEgresos";
import api from "../api/axios";

function UserMainPage() {
    const [mostrarAddEgreso, setMostrarAddEgreso] = useState(false);
    const [mostrarGrafico, setMostrarGrafico] = useState(false);
    const [egresos, setEgresos] = useState([]);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [egresoEnEdicion, setEgresoEnEdicion] = useState(null);
    const [usuario, setUsuario] = useState(null);

    const fetchExpenses = async () => {
      setCargando(true);
      setError("");
      try {
        const res = await api.get("/expenses", { params: { limit: 200 } });
        const payload = res?.data;
        const candidates = [
          payload,
          payload?.data,
          payload?.data?.expenses,
          payload?.data?.data,
          payload?.data?.data?.expenses,
          payload?.data?.results,
          payload?.data?.items,
          payload?.results,
          payload?.items,
          payload?.expenses,
        ];
        const normalized = candidates.find(Array.isArray) || [];
        // Map a shape similar to ListadoEgresos expects (fecha, descripcion, categoria, monto)
        const mapped = normalized.map((exp) => ({
          fecha: exp.expense_date || exp.fecha || exp.date,
          descripcion: exp.description || exp.descripcion,
          categoria: exp.category_name || exp.categoria || exp.category || "-",
          monto: exp.amount ?? exp.monto ?? exp.valor ?? 0,
          id: exp.id,
        }));
        setEgresos(mapped);
      } catch (err) {
        setError(err.response?.data?.detail || "No se pudieron cargar los egresos");
      } finally {
        setCargando(false);
      }
    };

    useEffect(() => {
      fetchExpenses();
      // Obtener usuario autenticado
      api.get("/users/me")
        .then(res => setUsuario(res.data))
        .catch(() => setUsuario(null));
    }, []);

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
            {error && <p className="text-red-200 mb-3">{error}</p>}
            <ListadoEgresos
              egresos={egresos}
              onEditar={manejarEditar}
              abrir={function(){setMostrarGrafico(true)}}
              abrirAddEgresos={function(){setMostrarAddEgreso(true)}}
            />
            {cargando && <p className="text-white mt-2 text-sm">Cargando egresos...</p>}
        </div>

        {mostrarGrafico && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <FiltrarGraficoEgreso egresos={egresos} cerrar={function() {setMostrarGrafico(false)}}/>
          </div>
        )}

        {mostrarAddEgreso && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <AddEgresos 
              cerrarAddEgreso={function(){setMostrarAddEgreso(false)}} 
              onCreated={fetchExpenses}
              usuarioId={usuario?.id}
            />
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