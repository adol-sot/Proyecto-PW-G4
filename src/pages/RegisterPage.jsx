import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { saveUser } from '../utils/userStorage'

function RegisterPage() {
    const navigate = useNavigate()
    const { isAuthenticated, isAdmin, loading: authLoading } = useAuth()
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState({})
    const [success, setSuccess] = useState(false)

    // Redirigir si ya está autenticado
    useEffect(function() {
        if (!authLoading && isAuthenticated()) {
            if (isAdmin()) {
                navigate('/adminmain', { replace: true })
            } else {
                navigate('/usermain', { replace: true })
            }
        }
    }, [isAuthenticated, isAdmin, authLoading, navigate])

    function nombreOnChange(event) {
        setNombre(event.target.value)
        if (error.nombre) {
            setError({ ...error, nombre: '' })
        }
    }

    function correoOnChange(event) {
        setCorreo(event.target.value)
        if (error.correo) {
            setError({ ...error, correo: '' })
        }
    }

    function contraseñaOnChange(event) {
        setContraseña(event.target.value)
        if (error.contraseña) {
            setError({ ...error, contraseña: '' })
        }
    }

    function validar() {
        const nuevosErrores = {}

        if (!nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es requerido'
        }

        if (!correo.trim()) {
            nuevosErrores.correo = 'El correo electrónico es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            nuevosErrores.correo = 'El correo electrónico no es válido'
        }

        if (!contraseña) {
            nuevosErrores.contraseña = 'La contraseña es requerida'
        } else if (contraseña.length < 6) {
            nuevosErrores.contraseña = 'La contraseña debe tener al menos 6 caracteres'
        }

        setError(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        if (validar()) {
            try {
                // Guardar usuario en localStorage
                saveUser({ nombre, correo, contraseña })
                setSuccess(true)
                setNombre('')
                setCorreo('')
                setContraseña('')
                
                // Redirigir al login después de 2 segundos
                setTimeout(function() {
                    navigate('/')
                }, 2000)
            } catch (error) {
                // Si el correo ya existe, mostrar error
                if (error.message.includes('correo')) {
                    setError({ correo: error.message })
                } else {
                    setError({ general: 'Error al registrar usuario. Por favor, intenta nuevamente.' })
                }
            }
        }
    }

    return <div className="flex justify-center bg-blue-900 shadow-lg min-h-screen">
        <div className="border-2 rounded-4xl border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2"> 
            <img className="w-2/3 place-self-center mx-auto" src="/imagenes/Palisade_Logo2.jpeg"/> 
            <div className="text-center mt-4">
                <h1 className="text-4xl font-bold">Crear Cuenta</h1>
                <h2 className="text-2xl mt-3">Regístrate para comenzar</h2>
            </div>

            {success && (
                <div className="bg-green-500 text-white p-4 rounded-xl mt-6 text-center font-medium">
                    ✓ ¡Registro exitoso! Redirigiendo al login...
                </div>
            )}

            {error.general && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mt-6 text-center font-medium">
                    {error.general}
                </div>
            )}

            <form className="mt-6 px-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1">
                    <label className="ml-1">Nombre Completo</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="text" 
                        value={nombre} 
                        onChange={nombreOnChange}
                    />
                    {error.nombre && <span className="text-red-500 text-sm mt-1">{error.nombre}</span>}
                </div>

                <div className="grid grid-cols-1 mt-4">
                    <label className="ml-1">Correo</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="email" 
                        value={correo} 
                        onChange={correoOnChange}
                    />
                    {error.correo && <span className="text-red-500 text-sm mt-1">{error.correo}</span>}
                </div>

                <div className="grid grid-cols-1 mt-4">
                    <label className="ml-1">Contraseña</label>
                    <input 
                        className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" 
                        type="password" 
                        value={contraseña} 
                        onChange={contraseñaOnChange}
                    />
                    {error.contraseña && <span className="text-red-500 text-sm mt-1">{error.contraseña}</span>}
                </div>

                <div className="mt-4">
                    <button 
                        className="mt-4 bg-yellow-300 w-full rounded-full py-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white" 
                        type="submit"
                    >
                        Registrarse
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <Link className="text-sm hover:underline" to="/"> 
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </div>
            </form>
        </div>
    </div>
}

export default RegisterPage
