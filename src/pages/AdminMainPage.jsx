import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getTotalUsers, getUsersByMonth, getUsersThisMonth, getUsers } from '../utils/userStorage'

function AdminMainPage() {
    const [totalUsers, setTotalUsers] = useState(0)
    const [usersThisMonth, setUsersThisMonth] = useState(0)
    const [usersByMonth, setUsersByMonth] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(function() {
        // Cargar datos desde localStorage
        function cargarDatos() {
            try {
                const total = getTotalUsers()
                const esteMes = getUsersThisMonth()
                const porMes = getUsersByMonth(12)
                const todosUsuarios = getUsers()
                
                // Ordenar usuarios por fecha de registro (más nuevos primero)
                const usuariosOrdenados = [...todosUsuarios].sort(function(a, b) {
                    const fechaA = new Date(a.fechaRegistro)
                    const fechaB = new Date(b.fechaRegistro)
                    return fechaB - fechaA
                })
                
                setTotalUsers(total)
                setUsersThisMonth(esteMes)
                setUsersByMonth(porMes)
                setUsers(usuariosOrdenados)
                setLoading(false)
            } catch (error) {
                console.error('Error al cargar datos:', error)
                setLoading(false)
            }
        }

        cargarDatos()

        // Escuchar cambios en localStorage
        function manejarCambios() {
            cargarDatos()
        }

        window.addEventListener('storage', manejarCambios)
        window.addEventListener('userRegistered', manejarCambios)

        return function() {
            window.removeEventListener('storage', manejarCambios)
            window.removeEventListener('userRegistered', manejarCambios)
        }
    }, [])

    return <div className="w-full">
        <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-2 font-bold">Panel de Administración</h1>
            <p className="text-white text-lg">Gestión y estadísticas de usuarios</p>
        </div>

        {loading ? (
            <div className="text-center text-white text-xl py-12">Cargando datos...</div>
        ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">👥</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Usuarios Totales</h3>
                        <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
                        <span className="text-sm text-gray-500">Usuarios registrados</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">📈</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Nuevos este mes</h3>
                        <p className="text-3xl font-bold text-gray-800">{usersThisMonth}</p>
                        <span className="text-sm text-gray-500">Registrados este mes</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Promedio mensual</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            {usersByMonth.length > 0 
                                ? Math.round(totalUsers / usersByMonth.length) 
                                : 0}
                        </p>
                        <span className="text-sm text-gray-500">Usuarios por mes</span>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nuevos Usuarios por Mes</h2>
                        <p className="text-gray-600 mb-8 text-sm">Registro de nuevos usuarios en los últimos 12 meses</p>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={usersByMonth}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="mes" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="usuarios" fill="#fbbf24" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lista de Usuarios Registrados</h2>
                        <p className="text-gray-600 mb-8 text-sm">Todos los usuarios registrados en la plataforma</p>
                        
                        {users.length === 0 ? (
                            <div className="text-center py-12 text-gray-600">
                                <p>No hay usuarios registrados aún</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-3 text-left text-sm uppercase">Nombre</th>
                                            <th className="p-3 text-left text-sm uppercase">Correo Electrónico</th>
                                            <th className="p-3 text-left text-sm uppercase">Rol</th>
                                            <th className="p-3 text-left text-sm uppercase">Fecha de Registro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(function(user) {
                                            return (
                                                <tr key={user.id} className="border-t hover:bg-amber-600 hover:text-white">
                                                    <td className="p-3">{user.nombre}</td>
                                                    <td className="p-3">{user.correo}</td>
                                                    <td className="p-3">
                                                        {user.rol === 'admin' ? '👑 Administrador' : '👤 Usuario'}
                                                    </td>
                                                    <td className="p-3">
                                                        {new Date(user.fechaRegistro).toLocaleDateString('es-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )}
    </div>
}

export default AdminMainPage