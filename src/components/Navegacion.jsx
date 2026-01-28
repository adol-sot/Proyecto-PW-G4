import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function Navegacion() {
    const [esAdmin, setEsAdmin] = useState(false)

    useEffect(function() {
        const admin = localStorage.getItem("esAdmin")
        if (admin === "true") {
            setEsAdmin(true)
        } else {
            setEsAdmin(false)
        }
    }, [])

    function handleLogout() {
        localStorage.setItem("esAdmin", "false")
    }

    return <nav className="bg-blue-500 shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <img className="h-12 rounded-xl" src="/imagenes/Palisade_Logo2.jpeg" alt="Logo" />
            <div className="flex items-center gap-4">
                {esAdmin && (
                    <Link to="/adminmain" className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black">
                        Admin
                    </Link>
                )}
                {!esAdmin &&
                <Link to="/usermain" className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black">
                    Egresos
                </Link>
                }
                {!esAdmin &&
                <Link to="/usermainfiltros" className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black">
                    Filtros
                </Link>
                }
                <Link to="/" onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600">
                    Cerrar Sesión
                </Link>
            </div>
        </div>
    </nav>
}

export default Navegacion
