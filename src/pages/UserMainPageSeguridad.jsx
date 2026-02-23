import { useNavigate } from "react-router-dom"
import DetallesCuentaUser from "../components/DetallesCuentaUser"
import Navegacion from "../components/Navegacion"


function UserMainPageSeguridad() {

    const navigate = useNavigate()

    async function CambiarContra() {
        const correo = localStorage.getItem("MAIL")
        const URL = "http://localhost:8000/usuarios/cambiar-password-autorizado/"

        let response
        response = await fetch(URL + correo, {
            method: "PUT",
            headers : {
                "x-token" : localStorage.getItem("TOKEN")
            }
        })

        if (!response.ok) {
            console.log("Error de petición. " + response.status)
                return
        }

        const data = await response.json()
        console.log(data.msg)
        navigate("/usermain")
    }

    return <div className="min-h-screen bg-blue-900 relative">
        <Navegacion />
        <div className="border-2 rounded-4xl mx-auto border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 xs:w-1/2">
            <h1 className="text-4xl font-bold text-center"> Detalles de Cuenta </h1>
            <DetallesCuentaUser OnCambiarContra={ CambiarContra } />
        </div>
    </div>
    
}

export default UserMainPageSeguridad