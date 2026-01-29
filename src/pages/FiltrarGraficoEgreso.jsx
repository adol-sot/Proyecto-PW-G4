import { useLocation } from "react-router-dom";
import GraficoEgresos from "../components/GraficoEgresos"
import { useState } from "react";

function FiltrarGraficoEgreso({ egresos, cerrar }) {

    const [tipoGrafico, setTipoGrafico] = useState("categoria");

    return <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <button onClick={cerrar} className="absolute top-3 right-3 text-gray-500 hover:text-black" type="button">
            X
        </button>

        <h2 className="text-center text-xl font-semibold mb-4">
            Distribución de egresos
        </h2>

        <select value={tipoGrafico}
            onChange={function (e) {
                setTipoGrafico(e.target.value)
            }}
            className="w-full mb-6 p-2 border rounded-md">
            <option value="categoria">Ver por categoría</option>
            <option value="mes">Ver por mes</option>
        </select>
        <GraficoEgresos egresos={egresos} tipo={tipoGrafico} />
    </div>
}

export default FiltrarGraficoEgreso