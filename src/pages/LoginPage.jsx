import { Link, useNavigate } from "react-router-dom"
import FormularioLogin from "../components/FormularioLogin"
import TituloLogin from "../components/TituloLogin"

function LoginPage() {

    const navigate = useNavigate()

    function login(correo, contra) {
        if (correo == "User@abc" && contra == "123") {
            console.log("Login Usuario Autentificado")
            navigate("/usermain")
        } if (correo == "Admin@abc" && contra == "123") {
            console.log("Login Admin Autentificado")
            navigate("/adminmain")
        } else {
            console.log("Credenciales Incorrectas")
        }
    }

    return <div className="flex justify-center bg-blue-900 shadow-lg min-h-screen">
        <div className="border-2 rounded-4xl border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2"> 
            <img  className="w-2/3 place-self-center" src="/imagenes/Palisade_Logo2.jpeg"/> 
            <TituloLogin />
            <FormularioLogin onLogin={ login }/>
        </div>
    </div>
}

export default LoginPage