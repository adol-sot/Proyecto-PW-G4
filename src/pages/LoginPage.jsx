import { Link, useNavigate } from "react-router-dom"
import FormularioLogin from "../components/FormularioLogin"
import TituloLogin from "../components/TituloLogin"

function LoginPage() {

    const navigate = useNavigate()

    async function loginHTTP(correo, contra) {
        const resp = await fetch("http://127.0.0.1:8000/login", {
            method : "POST",
            body : JSON.stringify({
                username : correo,
                password : contra
            }),
            //Especificar el tipo de contenido
            headers : {
                "content-type" : "application/json"
            }
        })
        if (resp.status != 200) {
            const data = await resp.json()
            console.error("ERROR:", data)
            return false
        }

        const data = await resp.json()
        if (data.msg == "Login exitoso") {
            localStorage.setItem("TOKEN", data.token)
            localStorage.setItem("USER_ID", data.data.id)
            localStorage.setItem("USER_ROLE", data.data.role)
            localStorage.setItem("MAIL", data.data.email)
            return true
        } else {
            console.error(data.detail)
            return false
        }  
    }

    async function login(correo, contra) {
        const resultadologin = await loginHTTP(correo, contra)

         if ( resultadologin ) {
            const role = localStorage.getItem("USER_ROLE")
            if (role == "admin") {
                navigate("/adminmain")
            }
            if (role == "user") {
                navigate("/usermain")
            }
        } else {
            console.log("Credenciales Incorrectas")
        }

        /*
        if (correo == "User@abc" && contra == "123") {
            localStorage.setItem("esAdmin", "false")
            console.log("Login Usuario Autentificado")
            navigate("/usermain")
        } else if (correo == "Admin@abc" && contra == "123") {
            localStorage.setItem("esAdmin", "true")
            console.log("Login Admin Autentificado")
            navigate("/adminmain")
        } else {
            console.log("Credenciales Incorrectas")
        */
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
