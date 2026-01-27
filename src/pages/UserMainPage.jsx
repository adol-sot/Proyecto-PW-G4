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

function UserMainPage() {
    return <div>
        <ListadoEgresos egresos={listaEgresos} />
    </div>
}

export default UserMainPage