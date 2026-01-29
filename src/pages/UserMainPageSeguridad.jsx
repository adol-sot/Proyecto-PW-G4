import DetallesCuentaUser from "../components/DetallesCuentaUser"
import Navegacion from "../components/Navegacion"

function UserMainPageSeguridad() {
    return <div className="min-h-screen bg-blue-900 relative">
        <Navegacion />
        <div className="border-2 rounded-4xl place-self-center border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2">
            <h1 className="text-4xl font-bold place-self-center"> Detalles de Cuenta </h1>
            <DetallesCuentaUser />
        </div>
    </div>
    
}

export default UserMainPageSeguridad