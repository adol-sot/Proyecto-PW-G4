const users = [
  { id: 1, name: "Juan Pérez", email: "juan@gmail.com", role: "Usuario"},
  { id: 2, name: "Ana Torres", email: "ana@gmail.com", role: "Usuario"},
  { id: 3, name: "Carlos Ruiz", email: "carlos@gmail.com", role: "Usuario"},
  { id: 3, name: "Rodrigo Paz", email: "Rodrigo@gmail.com", role: "Usuario"},
  { id: 3, name: "Luis Barco", email: "Luis@gmail.com", role: "Usuario"},
];

function MostrarUsuarios ()  {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left bg-yellow-200">Nombre</th>
            <th className="px-4 py-2 text-left bg-yellow-200">Correo</th>
            <th className="px-4 py-2 text-left bg-yellow-200">Rol</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarUsuarios;