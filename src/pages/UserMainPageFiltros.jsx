import Navegacion from "../components/Navegacion"

function UserMainPageFiltros() {
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
                                <select className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm">
                                    <option>Todas las categorías</option>
                                    <option>Alimentación</option>
                                    <option>Transporte</option>
                                    <option>Entretenimiento</option>
                                    <option>Servicios</option>
                                    <option>Salud</option>
                                    <option>Educación</option>
                                    <option>Otros</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Fecha Desde</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Fecha Hasta</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Monto Mínimo</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-gray-800 text-sm">Monto Máximo</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm"
                                />
                            </div>
                        </div>

                        <button 
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
                            <span className="text-gray-600 font-medium">8 egresos encontrados</span>
                            <span className="bg-yellow-300 text-black px-4 py-2 rounded-full font-bold text-lg">
                                Total: $1215.50
                            </span>
                        </div>
                    </div>

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
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">22 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                                            Entretenimiento
                                        </span>
                                    </td>
                                    <td className="p-3">Streaming</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$95.00</td>
                                </tr>
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">21 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                            Salud
                                        </span>
                                    </td>
                                    <td className="p-3">Farmacia</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$180.00</td>
                                </tr>
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">20 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                            Transporte
                                        </span>
                                    </td>
                                    <td className="p-3">Gasolina</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$120.00</td>
                                </tr>
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">19 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                            Servicios
                                        </span>
                                    </td>
                                    <td className="p-3">Luz y agua</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$350.00</td>
                                </tr>
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">18 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                            Alimentación
                                        </span>
                                    </td>
                                    <td className="p-3">Restaurante</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$75.00</td>
                                </tr>
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">17 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                                            Entretenimiento
                                        </span>
                                    </td>
                                    <td className="p-3">Cine</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$200.00</td>
                                </tr>
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">16 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                            Transporte
                                        </span>
                                    </td>
                                    <td className="p-3">Uber</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$45.50</td>
                                </tr>
                                <tr className="border-t hover:bg-amber-100">
                                    <td className="p-3">15 de enero de 2025</td>
                                    <td className="p-3">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                            Alimentación
                                        </span>
                                    </td>
                                    <td className="p-3">Supermercado</td>
                                    <td className="p-3 font-bold text-red-600 text-lg">$150.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default UserMainPageFiltros
