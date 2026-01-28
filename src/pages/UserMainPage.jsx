import { useNavigate } from "react-router-dom";
import ListadoEgresos from "../components/ListadoEgresos"

const listaEgresos = [
    {
      fecha: "2024-06-01",
      descripcion: "Compra en supermercado",
      categoria: "Alimentos",
      monto: 350,
    },
    {
      fecha: "2024-06-03",
      descripcion: "Pago de servicios",
      categoria: "Servicios",
      monto: 120,
    },
    {
      fecha: "2024-07-02",
      descripcion: "Cena fuera",
      categoria: "Alimentos",
      monto: 180,
    },
    {
      fecha: "2024-07-05",
      descripcion: "Gasolina",
      categoria: "Transporte",
      monto: 200,
    },
    {
      fecha: "2024-08-01",
      descripcion: "Alquiler",
      categoria: "Vivienda",
      monto: 1200,
    },
    {
      fecha: "2024-08-10",
      descripcion: "Internet",
      categoria: "Servicios",
      monto: 150,
    }
  ];

function UserMainPage() {

    const navigate = useNavigate()

    function verGrafico(){
        navigate("/grafico-egresos", {
            state: {
                egresos: listaEgresos
            }
        })
    }
    return <div>
        <ListadoEgresos egresos={listaEgresos} />
        
        <div className="flex justify-center mt-6">
            <button
                type="button"
                onClick={verGrafico}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Ver gráfico de egresos
            </button>
        </div>
    </div>
}

export default UserMainPage