import { useEffect, useMemo, useState } from "react"
import MostrarUsuarios from "../components/MostrarUsuarios"
import Navegacion from "../components/Navegacion"
import api from "../api/axios"

function AdminMainPage() {
    const [stats, setStats] = useState({ total_users: 0, new_users_this_month: 0, users_by_month: {} })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchStats() {
            setLoading(true)
            setError("")
            try {
                const res = await api.get("/users/stats/summary")
                setStats(res.data)
            } catch (err) {
                setError(err.response?.data?.detail || "No se pudieron cargar las estadísticas")
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const chartData = useMemo(() => {
        const entries = Object.entries(stats.users_by_month || {})
        return entries.map(([ym, count]) => ({ ym, count }))
    }, [stats.users_by_month])

    const monthlyAverage = useMemo(() => {
        if (!chartData.length) return 0
        const total = chartData.reduce((acc, item) => acc + item.count, 0)
        return Math.round((total / chartData.length) * 10) / 10
    }, [chartData])

    return <div className="min-h-screen bg-blue-900">
        <Navegacion />
        <div className="p-8">
            <div className="w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl text-white mb-2 font-bold">Panel de Administración</h1>
                    <p className="text-white text-lg">Gestión y estadísticas de usuarios</p>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">👥</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Usuarios Totales</h3>
                        <p className="text-3xl font-bold text-gray-800">{stats.total_users}</p>
                        <span className="text-sm text-gray-500">Usuarios registrados</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">📈</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Nuevos este mes</h3>
                        <p className="text-3xl font-bold text-gray-800">{stats.new_users_this_month}</p>
                        <span className="text-sm text-gray-500">Registrados en el mes actual</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Promedio mensual</h3>
                        <p className="text-3xl font-bold text-gray-800">{monthlyAverage}</p>
                        <span className="text-sm text-gray-500">Usuarios por mes</span>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nuevos Usuarios por Mes</h2>
                        <p className="text-gray-600 mb-4 text-sm">Datos calculados desde la fecha de creación del usuario</p>

                        {loading && <div className="text-gray-600">Cargando estadísticas...</div>}

                        {!loading && (
                            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                                <div className="flex items-end gap-3 overflow-x-auto" style={{height: '260px', paddingBottom: '30px'}}>
                                    {chartData.length === 0 && <div className="text-gray-500">Sin datos</div>}
                                    {chartData.map(item => {
                                        const height = Math.max(20, Math.min(200, item.count * 30))
                                        const [year, month] = item.ym.split('-')
                                        return (
                                            <div key={item.ym} className="flex flex-col items-center justify-end flex-none" style={{width: '70px'}}>
                                                <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height}}></div>
                                                <span className="text-sm text-gray-700 font-semibold">{month}</span>
                                                <span className="text-xs text-gray-500 mt-1">{item.count}</span>
                                                <span className="text-[10px] text-gray-400">{year}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                
                <div className="mt-10">
                    <MostrarUsuarios />
                </div>
                
            </div>
        </div>
    </div>
}

export default AdminMainPage
