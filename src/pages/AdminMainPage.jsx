import Navegacion from "../components/Navegacion"

function AdminMainPage() {
    return <div className="min-h-screen bg-blue-900">
        <Navegacion />
        <div className="p-8">
            <div className="w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl text-white mb-2 font-bold">Panel de Administración</h1>
                    <p className="text-white text-lg">Gestión y estadísticas de usuarios</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">👥</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Usuarios Totales</h3>
                        <p className="text-3xl font-bold text-gray-800">25</p>
                        <span className="text-sm text-gray-500">Usuarios registrados</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">📈</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Nuevos este mes</h3>
                        <p className="text-3xl font-bold text-gray-800">5</p>
                        <span className="text-sm text-gray-500">Registrados este mes</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xs text-gray-600 mb-1 font-semibold uppercase">Promedio mensual</h3>
                        <p className="text-3xl font-bold text-gray-800">3</p>
                        <span className="text-sm text-gray-500">Usuarios por mes</span>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Lista de Usuarios Registrados</h2>
                        <p className="text-gray-600 mb-8 text-sm">Todos los usuarios registrados en la plataforma</p>
                        
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Nuevos Usuarios por Mes</h3>
                            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                                <div className="flex items-end justify-center gap-3" style={{height: '280px', paddingBottom: '30px'}}>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '150px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Ene</span>
                                        <span className="text-xs text-gray-500 mt-1">3</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '125px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Feb</span>
                                        <span className="text-xs text-gray-500 mt-1">2</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '100px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Mar</span>
                                        <span className="text-xs text-gray-500 mt-1">2</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '110px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Abr</span>
                                        <span className="text-xs text-gray-500 mt-1">2</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '140px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">May</span>
                                        <span className="text-xs text-gray-500 mt-1">3</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '90px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Jun</span>
                                        <span className="text-xs text-gray-500 mt-1">2</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '75px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Jul</span>
                                        <span className="text-xs text-gray-500 mt-1">1</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '60px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Ago</span>
                                        <span className="text-xs text-gray-500 mt-1">1</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '100px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Sep</span>
                                        <span className="text-xs text-gray-500 mt-1">2</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '110px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Oct</span>
                                        <span className="text-xs text-gray-500 mt-1">2</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '125px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Nov</span>
                                        <span className="text-xs text-gray-500 mt-1">2</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-end flex-1 h-full">
                                        <div className="w-full bg-yellow-300 rounded-t-lg mb-2 shadow-md hover:bg-amber-400 transition-colors" style={{height: '175px', minHeight: '30px'}}></div>
                                        <span className="text-sm text-gray-700 font-semibold">Dic</span>
                                        <span className="text-xs text-gray-500 mt-1">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
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
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">María González</td>
                                        <td className="p-3">maria.gonzalez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">15 de enero de 2025</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Juan Pérez</td>
                                        <td className="p-3">juan.perez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">10 de enero de 2025</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Ana Martínez</td>
                                        <td className="p-3">ana.martinez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">5 de enero de 2025</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Carlos Rodríguez</td>
                                        <td className="p-3">carlos.rodriguez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">1 de enero de 2025</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Laura Sánchez</td>
                                        <td className="p-3">laura.sanchez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">28 de diciembre de 2024</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Diego Fernández</td>
                                        <td className="p-3">diego.fernandez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">20 de diciembre de 2024</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Sofía López</td>
                                        <td className="p-3">sofia.lopez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">15 de diciembre de 2024</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Miguel Torres</td>
                                        <td className="p-3">miguel.torres@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">10 de diciembre de 2024</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Isabella Ramírez</td>
                                        <td className="p-3">isabella.ramirez@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">5 de diciembre de 2024</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Andrés Morales</td>
                                        <td className="p-3">andres.morales@email.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                👤 Usuario
                                            </span>
                                        </td>
                                        <td className="p-3">1 de diciembre de 2024</td>
                                    </tr>
                                    <tr className="border-t hover:bg-amber-600 hover:text-white">
                                        <td className="p-3">Administrador</td>
                                        <td className="p-3">admin@admin.com</td>
                                        <td className="p-3">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                                👑 Administrador
                                            </span>
                                        </td>
                                        <td className="p-3">1 de enero de 2025</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AdminMainPage
