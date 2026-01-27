import { createContext, useContext, useState, useEffect } from 'react'
import { initializeAdmin, initializeSampleUsers } from '../utils/userStorage'

const AuthContext = createContext(null)

const SESSION_KEY = 'gestion_gastos_session'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(function() {
        // Inicializar admin por defecto
        initializeAdmin()
        
        // Inicializar usuarios de ejemplo
        initializeSampleUsers()
        
        // Cargar sesión guardada
        const sesionGuardada = localStorage.getItem(SESSION_KEY)
        if (sesionGuardada) {
            try {
                const datosSesion = JSON.parse(sesionGuardada)
                setUser(datosSesion)
            } catch (error) {
                console.error('Error al cargar sesión:', error)
                localStorage.removeItem(SESSION_KEY)
            }
        }
        setLoading(false)
    }, [])

    function login(userData) {
        setUser(userData)
        localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    }

    function logout() {
        setUser(null)
        localStorage.removeItem(SESSION_KEY)
    }

    function isAdmin() {
        if (user && user.rol === 'admin') {
            return true
        }
        return false
    }

    function isAuthenticated() {
        if (user !== null) {
            return true
        }
        return false
    }

    const value = {
        user: user,
        login: login,
        logout: logout,
        isAdmin: isAdmin,
        isAuthenticated: isAuthenticated,
        loading: loading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider')
    }
    return context
}
