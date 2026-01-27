import { useState } from 'react'

function UserMainPage() {
    const [filters, setFilters] = useState({
        categoria: '',
        fechaDesde: '',
        fechaHasta: '',
        montoMin: '',
        montoMax: ''
    })

    const [expenses] = useState([
        { id: 1, categoria: 'Alimentación', monto: 150.00, fecha: '2025-01-15', descripcion: 'Supermercado' },
        { id: 2, categoria: 'Transporte', monto: 45.50, fecha: '2025-01-16', descripcion: 'Uber' },
        { id: 3, categoria: 'Entretenimiento', monto: 200.00, fecha: '2025-01-17', descripcion: 'Cine' },
        { id: 4, categoria: 'Alimentación', monto: 75.00, fecha: '2025-01-18', descripcion: 'Restaurante' },
        { id: 5, categoria: 'Servicios', monto: 350.00, fecha: '2025-01-19', descripcion: 'Luz y agua' },
        { id: 6, categoria: 'Transporte', monto: 120.00, fecha: '2025-01-20', descripcion: 'Gasolina' },
        { id: 7, categoria: 'Salud', monto: 180.00, fecha: '2025-01-21', descripcion: 'Farmacia' },
        { id: 8, categoria: 'Entretenimiento', monto: 95.00, fecha: '2025-01-22', descripcion: 'Streaming' }
    ])

    const categorias = ['Alimentación', 'Transporte', 'Entretenimiento', 'Servicios', 'Salud', 'Educación', 'Otros']

    function handleFilterChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFilters({
            ...filters,
            [name]: value
        })
    }

    function handleReset() {
        setFilters({
            categoria: '',
            fechaDesde: '',
            fechaHasta: '',
            montoMin: '',
            montoMax: ''
        })
    }

    const filteredExpenses = expenses.filter(function(expense) {
        // Filtro por categoría
        if (filters.categoria && expense.categoria !== filters.categoria) {
            return false
        }

        // Filtro por fecha
        if (filters.fechaDesde && expense.fecha < filters.fechaDesde) {
            return false
        }
        if (filters.fechaHasta && expense.fecha > filters.fechaHasta) {
            return false
        }

        // Filtro por monto
        if (filters.montoMin && expense.monto < parseFloat(filters.montoMin)) {
            return false
        }
        if (filters.montoMax && expense.monto > parseFloat(filters.montoMax)) {
            return false
        }

        return true
    })

    const totalFiltered = filteredExpenses.reduce(function(sum, expense) {
        return sum + expense.monto
    }, 0)

    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    function getCategoryColor(categoria) {
        if (categoria === 'Alimentación') {
            return 'bg-yellow-100 text-yellow-800'
        } else if (categoria === 'Transporte') {
            return 'bg-blue-100 text-blue-800'
        } else if (categoria === 'Entretenimiento') {
            return 'bg-pink-100 text-pink-800'
        } else if (categoria === 'Servicios') {
            return 'bg-green-100 text-green-800'
        } else if (categoria === 'Salud') {
            return 'bg-red-100 text-red-800'
        } else if (categoria === 'Educación') {
            return 'bg-indigo-100 text-indigo-800'
        } else {
            return 'bg-gray-100 text-gray-800'
        }
    }

    return <div className="w-full">
        <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-2 font-bold">Filtrado de Egresos</h1>
            <p className="text-white text-lg">Analiza tus gastos por categoría, fecha o monto</p>
        </div>

        <div className="mb-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Filtros</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-800 text-sm">Categoría</label>
                        <select
                            name="categoria"
                            value={filters.categoria}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                        >
                            <option value="">Todas las categorías</option>
                            {categorias.map(function(cat) {
                                return <option key={cat} value={cat}>{cat}</option>
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-800 text-sm">Fecha Desde</label>
                        <input
                            type="date"
                            name="fechaDesde"
                            value={filters.fechaDesde}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-800 text-sm">Fecha Hasta</label>
                        <input
                            type="date"
                            name="fechaHasta"
                            value={filters.fechaHasta}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-800 text-sm">Monto Mínimo</label>
                        <input
                            type="number"
                            name="montoMin"
                            value={filters.montoMin}
                            onChange={handleFilterChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-800 text-sm">Monto Máximo</label>
                        <input
                            type="number"
                            name="montoMax"
                            value={filters.montoMax}
                            onChange={handleFilterChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                        />
                    </div>
                </div>

                <button 
                    onClick={handleReset} 
                    className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600"
                >
                    Limpiar Filtros
                </button>
            </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Resultados</h2>
                <div className="flex gap-8 items-center flex-wrap">
                    <span className="text-gray-600 font-medium">{filteredExpenses.length} egresos encontrados</span>
                    <span className="bg-yellow-300 text-black px-4 py-2 rounded-full font-bold text-lg">
                        Total: ${totalFiltered.toFixed(2)}
                    </span>
                </div>
            </div>

            {filteredExpenses.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                    <p>No se encontraron egresos con los filtros aplicados</p>
                </div>
            ) : (
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
                            {filteredExpenses.map(function(expense) {
                                return (
                                    <tr key={expense.id} className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">{formatDate(expense.fecha)}</td>
                                        <td className="p-3">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(expense.categoria)}`}>
                                                {expense.categoria}
                                            </span>
                                        </td>
                                        <td className="p-3">{expense.descripcion}</td>
                                        <td className="p-3 font-bold text-red-600 text-lg">${expense.monto.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
}

export default UserMainPage