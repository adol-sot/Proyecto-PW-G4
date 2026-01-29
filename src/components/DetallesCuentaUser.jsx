import { useNavigate } from "react-router-dom"

function DetallesCuentaUser() {
    const navigate = useNavigate()

    return <div className="mt-6 px-10">
        <img className="h-24 border-black rounded-lg place-self-center mb-5" src="/imagenes/PFP.jpg"/>

        <div className="grid grid-cols-2">
            <label className="ml-1 font-bold text-center">Nombre:</label>
            <p className="rounded-md px-2 py-1 text-sm text-center">USER</p>

            <label className="ml-1 font-bold text-center">Correo:</label>
            <p className="rounded-md px-2 py-1 text-sm text-center">user@abc</p>
        </div>

        <div className="mt-2">
            <button className="mt-4 bg-yellow-300 w-full rounded-full p-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white" type="button"
                onClick={function(){navigate("/usercambiarcontra")}}>
                Cambiar Contraseña
            </button>
        </div>
    </div>
}

export default DetallesCuentaUser