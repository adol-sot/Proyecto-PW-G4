function ListadoEgresos({ egresos }){
    
    const egresosOrdenados=[...egresos].sort(
        function(a,b){
            return new Date(b.fecha) - new Date(a.fecha);
        }
    );

    return <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
            Mis egresos
        </h2>

        {egresosOrdenados.length == 0 ? (
            <p className="text-center py-6">
                No hay egresos registrados
            </p>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left text-sm uppercase">
                            <th className="p-3">Fecha</th>
                            <th className="p-3">Descripcion</th>
                            <th className="p-3">Categoria</th>
                            <th className="p-3 text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {egresosOrdenados.map(function (egreso){
                            return (
                                <tr className="border-t hover:bg-amber-600 text-black hover:text-white">
                                    <td className="p-3">{egreso.fecha}</td>
                                    <td className="p-3">{egreso.descripcion}</td>
                                    <td className="p-3">{egreso.categoria}</td>
                                    <td className="p-3 text-right text-red-600 font-medium">{egreso.monto}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
        }
    </div>

}

export default ListadoEgresos