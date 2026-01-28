import { useNavigate, Link } from "react-router-dom"

function RegisterPage() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/")
    }

    return <div className="flex justify-center bg-blue-900 shadow-lg min-h-screen">
        <div className="border-2 rounded-4xl border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2"> 
            <img className="w-2/3 place-self-center mx-auto" src="/imagenes/Palisade_Logo2.jpeg"/> 
            <div className="text-center mt-4">
                <h1 className="text-4xl font-bold">Crear Cuenta</h1>
                <h2 className="text-2xl mt-3">Regístrate para comenzar</h2>
            </div>

            <form className="mt-6 px-10">
                <div className="grid grid-cols-1">
                    <label className="ml-1">Nombre Completo</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="text" 
                    />
                </div>

                <div className="grid grid-cols-1 mt-4">
                    <label className="ml-1">Correo</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="text" 
                    />
                </div>

                <div className="grid grid-cols-1 mt-4">
                    <label className="ml-1">Contraseña</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="password" 
                    />
                </div>

                <div className="mt-4">
                    <button 
                        className="mt-4 bg-yellow-300 w-full rounded-full py-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white" 
                        type="button"
                        onClick={handleClick}
                    >
                        Registrarse
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-sm hover:underline"> 
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </div>
            </form>
        </div>
    </div>
}

export default RegisterPage
