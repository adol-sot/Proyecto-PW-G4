import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend)

function GraficoEgresos({ egresos = [], tipo }){
    function obtenerMes(fecha){
        const meses = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ]

        const numeroMes = new Date(fecha).getMonth()
        return meses[numeroMes]
    }

    let etiquetas = []

    if (tipo == "categoria") {
        etiquetas = Array.from(new Set(egresos.map(function (e) {
                    return e.categoria
                })
            )
        )
    }else{
        etiquetas = Array.from(new Set(egresos.map(function (e) {
                    return obtenerMes(e.fecha)
                })
            )
        )
    }

    const valores = etiquetas.map(function (etiqueta) {
        return egresos.filter(function (e) {
            if (tipo == "categoria") {
                return e.categoria == etiqueta
            }else{
                return obtenerMes(e.fecha) == etiqueta
            }
        }).reduce(function (sum, e) {
                return sum + e.monto
            }, 0)
    })

    const data = {
        labels: etiquetas,
        datasets: [
            {
                data: valores,
                backgroundColor: [
                    "#4F46E5",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#06B6D4",
                    "#A855F7",
                ]
            }
        ]
    }

    return <div className="flex justify-center">
        <div className="w-72">
            <Doughnut data={data} />
        </div>
    </div>
}

export default GraficoEgresos