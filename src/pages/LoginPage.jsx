import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { authenticateUser } from "../utils/userStorage"

function LoginPage() {
    const [correo, setCorreo] = useState("")
    const [contra, setContra] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { login, isAuthenticated, isAdmin, loading: authLoading } = useAuth()
    const navigate = useNavigate()

    // Redirigir si ya está autenticado
    useEffect(function() {
        if (!authLoading && isAuthenticated()) {
            if (isAdmin()) {
                navigate("/adminmain", { replace: true })
            } else {
                navigate("/usermain", { replace: true })
            }
        }
    }, [isAuthenticated, isAdmin, authLoading, navigate])

    function correoOnChange(event) {
        setCorreo(event.target.value)
        setError("")
    }

    function contraOnChange(event) {
        setContra(event.target.value)
        setError("")
    }

    function validar() {
        if (!correo.trim()) {
            setError("El correo electrónico es requerido")
            return false
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            setError("El correo electrónico no es válido")
            return false
        }

        if (!contra) {
            setError("La contraseña es requerida")
            return false
        }

        return true
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        if (validar()) {
            setLoading(true)
            
            // Autenticar usuario
            const usuarioAutenticado = authenticateUser(correo, contra)
            
            if (usuarioAutenticado) {
                // Iniciar sesión
                login(usuarioAutenticado)
                
                // Redirigir según el rol
                if (usuarioAutenticado.rol === 'admin') {
                    navigate("/adminmain")
                } else {
                    navigate("/usermain")
                }
            } else {
                setError("Correo electrónico o contraseña incorrectos")
                setLoading(false)
            }
        }
    }

    return <div className="flex justify-center bg-blue-900 shadow-lg min-h-screen">
        <div className="border-2 rounded-4xl border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2"> 
            <img className="w-2/3 place-self-center mx-auto" src="/imagenes/Palisade_Logo2.jpeg"/> 
            <div className="text-center mt-4">
                <h1 className="text-4xl font-bold">Bienvenido</h1>
                <h2 className="text-2xl mt-3">Iniciar sesión</h2>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mt-6 text-center font-medium">
                    {error}
                </div>
            )}

            <form className="mt-6 px-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1">
                    <label className="ml-1">Correo</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="email" 
                        value={correo} 
                        onChange={correoOnChange}
                        disabled={loading}
                    />
                </div>
                <div className="grid grid-cols-1 mt-4">
                    <label className="ml-1">Contraseña</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="password" 
                        value={contra} 
                        onChange={contraOnChange}
                        disabled={loading}
                    />
                    <Link to="/cambiarcontra" className="text-sm mt-1 text-blue-900 hover:text-amber-600"> 
                        ¿Olvidaste tu contraseña? 
                    </Link>
                </div>

                <div className="mt-4">
                    <button 
                        className="mt-4 bg-yellow-300 w-full rounded-full py-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Ingresar'}
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <Link className="text-sm hover:underline" to="/register"> 
                        ¿No tienes una cuenta? 
                    </Link>
                </div>
            </form>
        </div>
    </div>
}

export default LoginPage