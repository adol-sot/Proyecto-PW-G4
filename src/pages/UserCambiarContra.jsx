import { useNavigate } from "react-router-dom"

function UserCambiarContra(){

    const navigate = useNavigate()

    return <div className="flex justify-center items-center bg-blue-900 min-h-screen">
        <div className="rounded-4xl shadow-md p-10 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2">
            <h1 className="text-4xl font-bold place-self-center mb-6"> Cambiar Contraseña </h1  >
            <div>
                <p className="my-6">Ingresa tu correo electrónico y tu nueva contraseña. Una vez completado te enviaremos un correo para confirmar la acción.</p>
                <div className="grid">
                    <label className="text-sm font-medium mb-1">Contraseña actual</label>
                    <input type="password" className="rounded-full bg-gray-200 px-4 py-1"/>

                    <label className="text-sm font-medium mb-1 mt-5">Nueva contraseña</label>
                    <input type="password" className="rounded-full bg-gray-200 px-4 py-1"/>

                    <label className="text-sm font-medium mb-1 mt-3">Confirmar contraseña</label>
                    <input type="password" className="rounded-full bg-gray-200 px-4 py-1"/>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button onClick={function(){navigate("/usermainseguridad")}} type="button" className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400">
                        Cancelar
                    </button>
                    <button onClick={function(){navigate("/usermainseguridad")}} type="button" className="bg-yellow-300 px-6 py-2 rounded-full font-semibold text-black hover:bg-amber-600 hover:text-white">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default UserCambiarContra