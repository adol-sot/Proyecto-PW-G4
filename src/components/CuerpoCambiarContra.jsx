import { useNavigate } from "react-router-dom"

function CuerpoCambiarContra() {
    const navigate = useNavigate();

    return <div>
        <p className="my-6">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        <div className="grid">
            <label className="text-sm font-medium mb-1">Correo</label>
            <input type="email" className="w-full rounded-full bg-gray-200 px-4 py-1"/>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center mt-6">
            <button onClick={function(){navigate("/")}} 
                    type="button" 
                    className="w-full sm:w-auto bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400">
                Cancelar
            </button>
            <button type="button" 
                    className="w-full sm:w-auto bg-yellow-300 px-6 py-2 rounded-full font-semibold text-black hover:bg-amber-600 hover:text-white">
                <span className="md:hidden">Enviar enlace</span>
                <span className="hidden md:inline">Enviar enlace de recuperación</span>
            </button>
        </div>
    </div>
}

export default CuerpoCambiarContra