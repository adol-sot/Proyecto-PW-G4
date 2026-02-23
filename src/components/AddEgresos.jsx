import { useEffect, useState } from "react";
import api from "../api/axios";

function AddEgresos({ cerrarAddEgreso, onCreated, usuarioId }) {
    const [fecha, setFecha] = useState("");
    const [monto, setMonto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [loadingCat, setLoadingCat] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            setLoadingCat(true);
            try {
                const res = await api.get("/categories", { params: { limit: 200 } });
                const payload = res?.data;
                const candidates = [
                    payload,
                    payload?.data,
                    payload?.data?.categories,
                    payload?.data?.data,
                    payload?.data?.data?.categories,
                    payload?.data?.data?.data,
                    payload?.data?.data?.data?.categories,
                    payload?.data?.results,
                    payload?.data?.items,
                    payload?.results,
                    payload?.items,
                    payload?.categories,
                ];
                const normalized = candidates.find(Array.isArray) || [];
                setCategories(normalized);
            } catch (err) {
                setCategories([]);
            } finally {
                setLoadingCat(false);
            }
        };
        loadCategories();
    }, []);

    const handleSubmit = async () => {
        setError("");

        // Validaciones básicas en el front para evitar 422 inmediatos
        if (!fecha || !monto || !categoria) {
            setError("Completa fecha, monto y categoría");
            return;
        }

        const amountNum = parseFloat(monto);
        if (Number.isNaN(amountNum) || amountNum <= 0) {
            setError("Monto inválido");
            return;
        }

        setGuardando(true);
        try {
            await api.post("/expenses", {
                expense_date: fecha,
                amount: amountNum,
                category_id: categoria,
                description: descripcion,
                user_id: usuarioId,
            });
            if (onCreated) onCreated();
            cerrarAddEgreso();
        } catch (err) {
            const detail = err.response?.data?.detail;
            if (Array.isArray(detail)) {
                setError(detail.map((d) => d.msg || d.detail || JSON.stringify(d)).join(" | "));
            } else if (typeof detail === "object" && detail !== null) {
                setError(detail.msg || detail.detail || JSON.stringify(detail));
            } else {
                setError(typeof detail === "string" ? detail : "No se pudo registrar el egreso");
            }
        } finally {
            setGuardando(false);
        }
    };

    return <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <button onClick={cerrarAddEgreso} className="absolute top-3 right-3 text-gray-500 hover:text-black" type="button">
            X
        </button>
        
        <h2 className="text-2xl font-bold text-center">Registrar Egreso</h2>
        <hr className="my-5"></hr>
        <form className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 xs:grid-cols-1 gap-y-2 text-center">
            <label className="ml-1">Fecha:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />

            <label className="ml-1">Monto:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="number" value={monto} onChange={e => setMonto(e.target.value)} />

            <label className="ml-1">Categoría:</label>
            <select
                className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
            >
                <option value="">Selecciona</option>
                {categories.map(cat => (
                    <option
                        key={cat.id ?? cat.uuid ?? cat._id ?? cat.codigo}
                        value={cat.id ?? cat.uuid ?? cat._id ?? cat.codigo}
                    >
                        {cat.name ?? cat.nombre ?? cat.title ?? "(sin nombre)"}
                    </option>
                ))}
            </select>

            <label className="ml-1">Descripción:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </form>

        {loadingCat && <p className="text-gray-500 text-center mt-3 text-sm">Cargando categorías...</p>}
        {error && <p className="text-red-600 text-center mt-3 text-sm">{error}</p>}

        <div className="flex justify-center">
            <button
                className="mt-5 bg-yellow-300 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full xs:w-full rounded-full py-2 px-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white disabled:opacity-60"
                type="button"
                onClick={handleSubmit}
                disabled={guardando}
            >
                {guardando ? "Guardando..." : "Registrar"}
            </button>
        </div>
    </div>
}

export default AddEgresos