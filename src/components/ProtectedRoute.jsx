import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, requireAdmin }) {
    const { isAuthenticated, isAdmin, loading } = useAuth()

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen bg-blue-900">
            <p className="text-white text-xl">Cargando...</p>
        </div>
    }

    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }

    if (requireAdmin && !isAdmin()) {
        return <Navigate to="/usermain" replace />
    }

    return children
}

export default ProtectedRoute
