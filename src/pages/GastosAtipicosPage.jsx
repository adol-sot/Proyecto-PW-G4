import { useNavigate } from "react-router-dom"

function GastosAtipicosPage() {
    const navigate = useNavigate()

    return <div className="bg-blue-900">
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
        <div className="text-yellow-400 flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold mb-2">
                    Gastos Atípicos
                </h1>
                <p className="text-xl mb-8">
                    Detectamos gastos que sobrepasan tu comportamiento financiero habitual.
                </p>
            </div>
            <button className="bg-gray-300 rounded-2xl text-black px-3 py-1 text-xl hover:bg-gray-400" 
                    type="button" 
                    onClick={function(){navigate("/usermain")}}>
                Volver
            </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500 mb-5">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold">Tecnología</p>
                    <p className="text-sm text-gray-500">15 de enero, 2026</p>
                </div>
                <p className="text-2xl font-bold text-red-600">
                    S/ 850.00
                </p>
            </div>
            <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                    Monto inusual
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-700">
                    Categoría poco frecuente
                </span>
            </div>

            <p className="text-sm text-gray-600 mt-3">
                Este gasto es considerablemente mayor a tu promedio habitual
                y pertenece a una categoría que utilizas con poca frecuencia.
            </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500 mb-5">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold">Viajes</p>
                    <p className="text-sm text-gray-500">22 de enero, 2026</p>
                </div>
                <p className="text-2xl font-bold text-red-600">
                    S/ 1,200.00
                </p>
            </div>

            <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                    Monto inusual
                </span>
            </div>

            <p className="text-sm text-gray-600 mt-3">
                El monto de este gasto supera ampliamente el promedio mensual
                registrado en esta categoría.
            </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold">Mascotas</p>
                    <p className="text-sm text-gray-500">28 de enero, 2026</p>
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                    S/ 180.00
                </p>
            </div>

            <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                    Categoría poco frecuente
                </span>
            </div>

            <p className="text-sm text-gray-600 mt-3">
                Este gasto pertenece a una categoría que no forma parte
                de tus gastos habituales.
            </p>
        </div>
    </div>
</div>
}

export default GastosAtipicosPage