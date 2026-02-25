import { Link } from "react-router-dom"
import { useState, useEffect } from "react"


function Navegacion() {
    const [esAdmin, setEsAdmin] = useState(false)

    useEffect(function() {
        const role = localStorage.getItem("USER_ROLE")
        if (role === "admin") {
            setEsAdmin(true)
        } else {
            setEsAdmin(false)
        }
    }, [])

    async function handleLogout() {
        const token = localStorage.getItem("TOKEN")
        const response = await fetch(`http://localhost:8000/logout`, {
            method: "DELETE",
            body : JSON.stringify({
                token : token,
            }),
            headers: {
                "content-type" : "application/json"
            }
        })
        
        if (response.status != 200) {
            const data = await response.json()
            console.error("ERROR:", data)
        }

        const data = await response.json()
        if (data.msg == "Logout exitoso") {
            console.log("Logout exitoso")
            localStorage.clear()
        }
        
    }

    return <nav className="bg-blue-500 shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <div className="xs:visible ">
                <img className="h-12 rounded-xl" src="/imagenes/Palisade_Logo2.jpeg" alt="Logo" />
            </div>
            
            <div className="flex items-center gap-4">
                {esAdmin && (
                    <Link to="/adminmain" className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black">
                        Admin
                    </Link>
                )}
                {!esAdmin &&
                <Link to="/gastos-atipicos" className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black">
                    Gastos atipicos
                </Link>
                }
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
                {!esAdmin &&
                <Link to="/usermainseguridad" className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black">
                    Cuenta
                </Link>
                }
                {!esAdmin &&
                  <Link to="/presupuesto" className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black">
                    Presupuesto
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
