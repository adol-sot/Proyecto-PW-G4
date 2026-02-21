import { Link, useNavigate } from "react-router-dom"
import FormularioLogin from "../components/FormularioLogin"
import TituloLogin from "../components/TituloLogin"
import api from "../api/axios"

function LoginPage() {

    const navigate = useNavigate()

    async function login(correo, contra) {
        try {
            const response = await api.post('/auth/login', {
                email: correo,
                password: contra
            })

            const { access_token } = response.data
            localStorage.setItem("token", access_token)

            // Obtener info del usuario
            const userResponse = await api.get('/users/me')
            const user = userResponse.data

            if (user.role === "admin") {
                localStorage.setItem("esAdmin", "true")
                navigate("/adminmain")
            } else {
                localStorage.setItem("esAdmin", "false")
                navigate("/usermain")
            }

        } catch (error) {
            console.log("Error al iniciar sesión", error)
            // Propaga el error para que el formulario lo muestre
            throw new Error(error.response?.data?.detail || "Email o contraseña incorrectos")
        }
    }

    return <div className="flex justify-center bg-blue-900 shadow-lg min-h-screen">
        <div className="border-2 rounded-4xl border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2"> 
            <img className="w-2/3 place-self-center" src="/imagenes/Palisade_Logo2.jpeg"/> 
            <TituloLogin />
            <FormularioLogin onLogin={ login }/>
        </div>
    </div>
}

export default LoginPage