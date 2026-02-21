import { useState } from "react";
import { Link } from "react-router-dom"

function FormularioLogin({ onLogin }) {
    const [correo, setCorreo] = useState("")
    const [contra, setContra] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        setLoading(true)
        try {
            await onLogin(correo, contra)
        } catch (err) {
            setError(err?.message || "Credenciales incorrectas")
        } finally {
            setLoading(false)
        }
    }

    return <form className="mt-6 px-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
            <label className="ml-1">Correo</label>
            <input
                className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                type="email"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                required
            />
        </div>
        <div className="grid grid-cols-1 mt-4">
            <label className="ml-1"> Contraseña </label>
            <input
                className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                type="password"
                value={contra}
                onChange={(event) => setContra(event.target.value)}
                required
            />
            <Link to="/cambiarcontra" className="text-sm mt-1 text-blue-900 hover:text-amber-600"> ¿Olvidaste tu contraseña? </Link>
        </div>

        {error && <div className="mt-3 text-red-600 text-center">{error}</div>}

        <div className="mt-4">
            <button
                className="mt-4 bg-yellow-300 w-full rounded-full py-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white disabled:opacity-60"
                type="submit"
                disabled={loading}
            >
                {loading ? "Ingresando..." : "Ingresar"}
            </button>
        </div>
        <div>
            <Link to="/register" className="text-sm mt-4 place-self-center hover:underline"> ¿No tienes una cuenta? </Link>
        </div>
    </form>
}

export default FormularioLogin
