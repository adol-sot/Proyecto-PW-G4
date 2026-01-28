import { useState } from "react"
import ListadoEgresos from "../components/ListadoEgresos"

const listaEgresos = [
    {
        fecha: "2024-06-01",
        descripcion: "Compra en supermercado",
        categoria: "Alimentos",
        monto: 350,
    },{
        fecha: "2024-06-03",
        descripcion: "Pago de servicios",
        categoria: "Servicios",
        monto: 120,
    }

]

import Navegacion from "../components/Navegacion"

function UserMainPage() {
    return <div className="min-h-screen bg-blue-900">
        <Navegacion />
        <div className="p-8">
            <ListadoEgresos egresos={listaEgresos} />
        </div>
    </div>
}

export default UserMainPage