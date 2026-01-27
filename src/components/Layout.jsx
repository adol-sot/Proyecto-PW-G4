import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Layout({ children }) {
    const location = useLocation()
    const { isAuthenticated, isAdmin, user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    function getLinkClass(path) {
        if (location.pathname === path) {
            return "bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-amber-600 hover:text-white"
        } else {
            return "text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black"
        }
    }

    return <div className="min-h-screen bg-blue-900">
        <nav className="bg-blue-900 shadow-lg py-4">
            <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                <img className="h-12" src="/imagenes/Palisade_Logo2.jpeg" alt="Logo" />
                <div className="flex items-center gap-4">
                    {isAuthenticated() ? (
                        <>
                            {isAdmin() && (
                                <Link to="/adminmain" className={getLinkClass('/adminmain')}>
                                    Admin
                                </Link>
                            )}
                            <Link to="/usermain" className={getLinkClass('/usermain')}>
                                Egresos
                            </Link>
                            <div className="flex items-center gap-4 pl-4 border-l-2 border-white">
                                <span className="text-white font-medium">👤 {user?.nombre}</span>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/" className={getLinkClass('/')}>
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className={getLinkClass('/register')}>
                                Registro
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
        <main className="p-8">
            {children}
        </main>
    </div>
}

export default Layout
