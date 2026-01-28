import { useLocation } from "react-router-dom";
import GraficoEgresos from "../components/GraficoEgresos"
import { useState } from "react";

function FiltrarGraficoEgreso(){
    
    const location = useLocation();

    const egresos = location.state?.egresos || [];
    console.log("egresos:", egresos);

    const [tipoGrafico, setTipoGrafico] = useState("categoria");

    return <div className="flex justify-center items-center min-h-screen bg-blue-900">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-center text-xl font-semibold mb-4">
                Distribución de egresos
            </h2>

            <select value={tipoGrafico}
                    onChange={function(e){
                        setTipoGrafico(e.target.value);
                    }}
                    className="w-full mb-6 p-2 border rounded-md">
                <option value="categoria">Ver por categoría</option>
                <option value="mes">Ver por mes</option>
            </select>
            <GraficoEgresos key={tipoGrafico} egresos={ egresos } tipo={tipoGrafico}/>            
        </div>
    </div>
}

export default FiltrarGraficoEgreso