import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function GraficoEgresos({ datos = [], tipo }) {

    const nombresMes = [
        "", "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    let etiquetas = []
    let valores = []

    if (tipo === "categoria"){

        etiquetas = datos.map(d => d.category_name)
        valores = datos.map(d => d.total)

    }else {

        etiquetas = datos.map(d => nombresMes[d.mes])
        valores = datos.map(d => d.total)
    }

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