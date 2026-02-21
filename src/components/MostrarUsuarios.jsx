import { useState, useEffect } from "react";
import api from "../api/axios";

function MostrarUsuarios ()  {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/users", { params: { limit: 200 } });
        setUsers(res.data || []);
      } catch (err) {
        setError(err.response?.data?.detail || "No se pudo cargar usuarios");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-6 text-center md:text-left">
        Gestión de Usuarios
      </h2>

      {loading && <div className="text-center text-gray-600">Cargando usuarios...</div>}
      {error && <div className="text-center text-red-600 mb-4">{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border min-w-700px">
            <thead className="bg-yellow-200">
              <tr>
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Correo</th>
                <th className="border p-2 text-left">Rol</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-blue-100">
                  <td className="border p-2">{user.full_name || "(sin nombre)"}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MostrarUsuarios;
