import { Link } from "react-router-dom"

function FormularioLogin() {
    return <form className="mt-6 px-10">
        <div className="grid grid-cols-1">
            <label className="ml-1">Correo</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" type="text" />
        </div>
        <div className="grid grid-cols-1 mt-4">
            <label className="ml-1"> Contraseña </label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" type="password" />

            <Link to="/cambiarcontra" className="text-sm mt-1 text-blue-900 hover:text-amber-600" href="#"> ¿Olvidaste tu contraseña? </Link>
        </div>
        <div className="mt-4">
            <button className="mt-4 bg-yellow-300 w-full rounded-full py-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white">
                Ingresar
            </button>
        </div>
        <div>
            <Link className="text-sm mt-4 place-self-center" href="#"> ¿No tienes una cuenta? </Link>
        </div>
    </form>
}

export default FormularioLogin