import FormularioLogin from "../components/FormularioLogin"
import TituloLogin from "../components/TituloLogin"

function LoginPage() {
    return <div className="flex justify-center bg-blue-900 shadow-lg min-h-screen">
        <div className="rounded-4xl shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2"> 
            <TituloLogin />
            <FormularioLogin />
        </div>
    </div>
}

export default LoginPage