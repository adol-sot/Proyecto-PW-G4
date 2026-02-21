import { useEffect, useMemo, useState } from "react"
import Navegacion from "../components/Navegacion"
import api from "../api/axios"

function UserMainPageFiltros() {
    const [categories, setCategories] = useState([])
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [categoryId, setCategoryId] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [amountMin, setAmountMin] = useState("")
    const [amountMax, setAmountMax] = useState("")

    useEffect(() => {
        async function init() {
            try {
                const resCat = await api.get("/categories", { params: { limit: 200 } })
                setCategories(resCat.data || [])
            } catch (err) {
                // no-op visual; mantenemos filtros aunque no carguen categorías
            }
            await fetchExpenses()
        }
        init()
    }, [])

    const fetchExpenses = async () => {
        setLoading(true)
        setError("")
        try {
            const params = { limit: 200 }
            if (categoryId) params.category_id = categoryId
            if (dateFrom) params.date_from = new Date(dateFrom).toISOString()
            if (dateTo) params.date_to = new Date(dateTo).toISOString()
            if (amountMin) params.amount_min = parseFloat(amountMin)
            if (amountMax) params.amount_max = parseFloat(amountMax)

            const res = await api.get("/expenses", { params })
            setExpenses(res.data || [])
        } catch (err) {
            setError(err.response?.data?.detail || "No se pudieron cargar los egresos")
        } finally {
            setLoading(false)
        }
    }

    const totalAmount = useMemo(() => expenses.reduce((acc, exp) => acc + (exp.amount || 0), 0), [expenses])

    const resetFilters = () => {
        setCategoryId("")
        setDateFrom("")
        setDateTo("")
        setAmountMin("")
        setAmountMax("")
        fetchExpenses()
    }

    return <div className="min-h-screen bg-blue-900">
        <Navegacion />
        <div className="p-8">
            <div className="w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl text-white mb-2 font-bold">Filtrado de Egresos</h1>
                    <p className="text-white text-lg">Analiza tus gastos por categoría, fecha o monto</p>
                </div>

                <div className="mb-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Filtros</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Categoría</label>
                                <select 
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                    value={categoryId}
                                    onChange={e => setCategoryId(e.target.value)}
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Fecha Desde</label>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={e => setDateFrom(e.target.value)}
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Fecha Hasta</label>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={e => setDateTo(e.target.value)}
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Monto Mínimo</label>
                                <input
                                    type="number"
                                    value={amountMin}
                                    onChange={e => setAmountMin(e.target.value)}
                                    placeholder="0.00"
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Monto Máximo</label>
                                <input
                                    type="number"
                                    value={amountMax}
                                    onChange={e => setAmountMax(e.target.value)}
                                    placeholder="0.00"
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <button 
                                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700"
                                onClick={fetchExpenses}
                            >
                                Aplicar filtros
                            </button>
                            <button 
                                className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600"
                                onClick={resetFilters}
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">Resultados</h2>
                        <div className="flex gap-8 items-center flex-wrap">
                            <span className="text-gray-600 font-medium">{expenses.length} egresos encontrados</span>
                            <span className="bg-yellow-300 text-black px-4 py-2 rounded-full font-bold text-lg">
                                Total: S/.{totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {loading && <div className="text-gray-600">Cargando egresos...</div>}
                    {error && <div className="text-red-600 mb-4">{error}</div>}

                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="p-3 text-left text-sm uppercase">Fecha</th>
                                        <th className="p-3 text-left text-sm uppercase">Categoría</th>
                                        <th className="p-3 text-left text-sm uppercase">Descripción</th>
                                        <th className="p-3 text-left text-sm uppercase">Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map(exp => {
                                        const categoryName = categories.find(c => c.id === exp.category_id)?.name || "-"
                                        const dateStr = new Date(exp.expense_date).toLocaleDateString()
                                        return (
                                            <tr key={exp.id} className="border-t hover:bg-amber-100">
                                                <td className="p-3">{dateStr}</td>
                                                <td className="p-3">
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                                        {categoryName}
                                                    </span>
                                                </td>
                                                <td className="p-3">{exp.description || "(sin descripción)"}</td>
                                                <td className="p-3 font-bold text-red-600 text-lg">S/.{exp.amount?.toFixed(2)}</td>
                                            </tr>
                                        )
                                    })}
                                    {expenses.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-3 text-center text-gray-600">No hay egresos con los filtros seleccionados</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
}

export default UserMainPageFiltros
