import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Navegacion from "../components/Navegacion"

function GastosAtipicosPage() {

    const navigate = useNavigate()
    const [gastos, setGastos] = useState([])

    useEffect(() => {
        async function obtenerGastosAtipicos() {
            try {
                const token = localStorage.getItem("TOKEN")
                const userId = localStorage.getItem("USER_ID")

                const response = await fetch(`http://localhost:8000/egresos/${userId}/atipicos`,
                    {
                        headers: {
                            "x-token": token
                        }
                    }
                )

                const data = await response.json()
                if (response.ok) {
                    setGastos(data.data)
                } else {
                    console.error(data)
                }

            }catch (error){
                console.error("Error:", error)
            }
        }

        obtenerGastosAtipicos()
    }, [])

    return <div className="bg-blue-900 min-h-screen">
        <Navegacion />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 p-6">
            <div className="text-yellow-400 flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        Gastos Atípicos
                    </h1>
                    <p className="text-xl">
                        Detectamos gastos que sobrepasan tu comportamiento financiero habitual.
                    </p>
                </div>
            </div>

            {gastos.length === 0 && (
                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <p className="text-gray-600">
                        No se detectaron gastos atípicos.
                    </p>
                </div>
            )}

            {gastos.map((gasto) => {
                const esMontoInusual = gasto.flags.includes("MONTO_INUSUAL")
                const esCategoriaPocoFrecuente = gasto.flags.includes("CATEGORIA_POCO_FRECUENTE")

                const bordeColor = esMontoInusual ? "border-red-500" : "border-yellow-500"
                const montoColor = esMontoInusual ? "text-red-600" : "text-yellow-600"
                return (
                    <div key={gasto.id}
                        className={`bg-white rounded-xl shadow p-6 border-l-4 ${bordeColor} mb-5`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">
                                    {gasto.categoria}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(gasto.fecha).toLocaleDateString()}
                                </p>
                            </div>

                            <p className={`text-2xl font-bold ${montoColor}`}>
                                S/ {gasto.monto}
                            </p>
                        </div>

                        <div className="flex gap-2 mt-3">
                            {esMontoInusual && (
                                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                                    Monto inusual
                                </span>
                            )}
                            {esCategoriaPocoFrecuente && (
                                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                                    Categoría poco frecuente
                                </span>
                            )}

                        </div>

                        <p className="text-sm text-gray-600 mt-3">
                            {gasto.mensaje}
                        </p>
                    </div>
                )
            })}
        </div>
    </div>
}

export default GastosAtipicosPage