import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable';
import { useState } from 'react';

function ListadoEgresos({ egresos, onEditar }) {
    
    
    
    const egresosOrdenados = [...egresos].sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha);
    });
   
   const exportarPDF = () => {
        const doc = new jsPDF();
        const fecha = new Date().toLocaleDateString();

        
        doc.setFontSize(16);
        doc.text('Reporte de Egresos', 14, 15);

        doc.setFontSize(10);
        doc.text(`Generado el: ${fecha}`, 14, 25);

        
        autoTable(doc,{
            head: [['Fecha', 'Descripción', 'Categoría', 'Monto']],
            body: egresosOrdenados.map(egreso => [
                egreso.fecha,
                egreso.descripcion,
                egreso.categoria,
                
                `S/${Number(egreso.monto || 0).toFixed(2)}`
            ]),
            startY: 35,
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [59, 130, 246], textColor: 255, halign: 'center' },
            
            columnStyles: {
                0: { halign: 'center' },
                3: { halign: 'right' }
            }
        });

        
        const total = egresosOrdenados.reduce((sum, egreso) => sum + Number(egreso.monto || 0), 0);
        
        
        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 35;
        
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold'); 
        doc.text(`Total: S/${total.toFixed(2)}`, 14, finalY + 10);
        doc.addImage('public/imagenes/Palisade_Logo2.jpeg', 'JPEG', 150, finalY + 5, 25, 10);

        doc.save('egresos.pdf');
    };
    

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Mis egresos</h2>
                <button
                    onClick={exportarPDF}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    Exportar a PDF
                </button>
            </div>

            {egresosOrdenados.length === 0 ? (
                <p className="text-center py-6 text-gray-500">
                    No hay egresos registrados
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left text-sm uppercase text-gray-700">
                                <th className="p-3 rounded-tl-lg">Fecha</th>
                                <th className="p-3">Descripción</th>
                                <th className="p-3">Categoría</th>
                                <th className="p-3 text-right rounded-tr-lg">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {egresosOrdenados.map((egreso, index) => (
                                
                                <tr 
                                    key={index} 
                                    className="border-t border-gray-100 hover:bg-amber-50 transition duration-150 text-gray-800"
                                >
                                    <td className="p-3">{egreso.fecha}</td>
                                    <td className="p-3">{egreso.descripcion}</td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                            {egreso.categoria}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right text-red-600 font-bold font-mono">
                                        ${Number(egreso.monto).toFixed(2)}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => onEditar && onEditar(egreso)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ListadoEgresos;