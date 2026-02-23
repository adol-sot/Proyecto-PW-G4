import GraficoEgresos from "../components/GraficoEgresos"
import { useState, useEffect } from "react"

function FiltrarGraficoEgreso({ cerrar }) {

    const [tipoGrafico, setTipoGrafico] = useState("categoria");
    const [dataGrafico, setDataGrafico] = useState([]);

    useEffect(() => {
        async function obtenerDatos() {
            try {
                const token = localStorage.getItem("TOKEN")
                const userId = localStorage.getItem("USER_ID")
                let url = ""

                if (tipoGrafico === "categoria") {
                    url = `http://localhost:8000/egresos/grafico/categoria/${userId}`
                } else {
                    url = `http://localhost:8000/egresos/grafico/mensual/${userId}`
                }

                const response = await fetch(url, {
                    headers: {
                        "x-token": token
                    }
                })
                const result = await response.json()

                if (response.ok) {
                    setDataGrafico(result.data)
                } else {
                    console.error(result)
                }

            } catch (error) {
                console.error("Error:", error)
            }
        }
        obtenerDatos()
    }, [tipoGrafico])

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
        <GraficoEgresos datos={dataGrafico} tipo={tipoGrafico} />
    </div>
}

export default FiltrarGraficoEgreso