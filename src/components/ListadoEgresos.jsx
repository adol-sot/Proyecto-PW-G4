import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { useRef, useState } from 'react';

function ListadoEgresos({ egresos, onEditar, abrir, abrirAddEgresos }) {

    const navigate = useNavigate()
    const csvLinkRef = useRef();
    const [showExportModal, setShowExportModal] = useState(false);

    const egresosOrdenados = [...egresos].sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha)
    })

    const exportarPDF = () => {
        const doc = new jsPDF();
        const fecha = new Date().toLocaleDateString();

        doc.setFontSize(16);
        doc.text('Reporte de Egresos', 14, 15);

        doc.setFontSize(10);
        doc.text(`Generado el: ${fecha}`, 14, 25);

        autoTable(doc, {
            head: [['Fecha', 'Descripción', 'Categoría', 'Monto']],
            body: egresosOrdenados.map(egreso => [
                new Date(egreso.expense_date).toLocaleDateString(),
                egreso.description,
                egreso.category,
                `S/${Number(egreso.amount || 0).toFixed(2)}`
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

        const total = egresosOrdenados.reduce((sum, egreso) => sum + Number(egreso.amount || 0), 0);
        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 35;

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(`Total: S/${total.toFixed(2)}`, 14, finalY + 10);

        doc.save('egresos.pdf');
        setShowExportModal(false);
    };

    const exportarCSV = () => {
        if (csvLinkRef.current) {
            csvLinkRef.current.link.click();
        }
        setShowExportModal(false);
    };

        
    


    return <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Mis egresos</h2>
            <div className="flex gap-6">
                <button
                    onClick={abrirAddEgresos}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                    +
                </button>
                <button
                    onClick={abrir}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                    Ver gráfico
                </button>
                <button
                    onClick={() => setShowExportModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                    Exportar
                </button>
            </div>
        </div>

        {egresosOrdenados.length === 0 ? (
            <p className="text-center py-6 text-gray-500">
                No hay egresos registrados
            </p>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left text-sm uppercase text-gray-700">
                            <th className="p-3">Fecha</th>
                            <th className="p-3">Descripción</th>
                            <th className="p-3">Categoría</th>
                            <th className="p-3 text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {egresosOrdenados.map((egreso, index) => (

                            <tr key={index}
                                className="border-t border-gray-100 hover:bg-amber-50 transition duration-150 text-gray-800">
                                <td className="p-3">{new Date(egreso.expense_date).toLocaleDateString()}</td>
                                <td className="p-3">{egreso.description}</td>
                                <td className="p-3">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                        {egreso.category}
                                    </span>
                                </td>
                                <td className="p-3 text-right text-red-600 font-bold">
                                    S/.{Number(egreso.amount).toFixed(2)}
                                </td>
                                <td className="p-3 text-center">
                                    <button onClick={() => onEditar && onEditar(egreso)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-200">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        )}
        
        <CSVLink 
            ref={csvLinkRef}
            data={egresosOrdenados.map(egreso => ({
                expense_date: new Date(egreso.expense_date).toLocaleDateString(),
                description: egreso.description,
                category: egreso.category,
                amount: `S/${Number(egreso.amount || 0).toFixed(2)}`
            }))}
            headers={[
                { label: "Fecha", key: "expense_date" },
                { label: "Descripción", key: "description" },
                { label: "Categoría", key: "category" },
                { label: "Monto", key: "amount" }
            ]}
            filename={"egresos.csv"}
            style={{ display: 'none' }}
        />

        {showExportModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
                    <h3 className="text-lg font-semibold mb-4">Selecciona el tipo de exportación</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={exportarPDF}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                            Exportar PDF
                        </button>
                        <button
                            onClick={exportarCSV}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                            Exportar CSV
                        </button>
                        <button
                            onClick={() => setShowExportModal(false)}
                            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-200">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
}

export default ListadoEgresos;