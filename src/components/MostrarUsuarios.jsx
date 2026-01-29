import { useState, useEffect } from "react";

function MostrarUsuarios ()  {

  // Lista de usuarios (desde localStorage o datos iniciales)
  const [users, setUsers] = useState(() => {
    const datosGuardados = localStorage.getItem("usuarios");
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : [
          { id: 1, nombre: "Juan", apellido: "Pérez", email: "juan@gmail.com", role: "Usuario" },
          { id: 2, nombre: "Ana", apellido: "Torres", email: "ana@gmail.com", role: "Usuario" },
          { id: 3, nombre: "Carlos", apellido: "Guerra", email: "carlos@gmail.com", role: "Usuario" },
          { id: 4, nombre: "Santiago", apellido: "Gomez", email: "santiago@gmail.com", role: "Usuario" },
          { id: 5, nombre: "Pamela", apellido: "Aquino", email: "pamela@gmail.com", role: "Usuario" },
        ];
  });

  // Guardar en localStorage cada vez que cambie users
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(users));
  }, [users]);

  // Datos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");

  // ID del usuario que se está editando
  const [idEditar, setIdEditar] = useState(null);

  // Crear o Editar usuario
  function crearUsuario(e) {
    e.preventDefault();

    if (idEditar === null) {
      const nuevoUsuario = {
        id: users.length + 1,
        nombre: nombre,
        apellido: apellido,
        email: correo,
        role: "Usuario",
      };
      setUsers(users.concat(nuevoUsuario));

      setNombre("");
      setApellido("");
      setCorreo("");

    } else {
      const usuariosActualizados = users.map(user =>
        user.id === idEditar
          ? {
              ...user,
              nombre: nombre,
              apellido: apellido,
              email: correo,
            }
          : user
      );
      setUsers(usuariosActualizados);
      setIdEditar(null);
    }
  }

  // Cargar datos al formulario
  function editarUsuario(user) {
    setNombre(user.nombre);
    setApellido(user.apellido);
    setCorreo(user.email);
    setIdEditar(user.id);
  }

  // Eliminar usuario
  function eliminarUsuario(id) {
    const usuariosFiltrados = users.filter(user => user.id !== id);
    setUsers(usuariosFiltrados);
  }

  return (
    <div className="bg-white shadow p-4 rounded-xl">

      <h2 className="text-lg font-bold mb-6 text-center md:text-left">
        Gestión de Usuarios
      </h2>

      {/* Formulario */}
      <form
        onSubmit={crearUsuario}
        className="
          grid grid-cols-1
          sm:grid-cols-2
          md:flex md:gap-4
          gap-4 mb-12 items-end
        "
      >

        <div>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Ingrese nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border p-2 block rounded-md w-full"
          />
        </div>

        <div>
          <label>Apellido</label>
          <input
            type="text"
            placeholder="Ingrese apellido"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            className="border p-2 block rounded-md w-full"
          />
        </div>

        <div>
          <label>Correo</label>
          <input
            type="email"
            placeholder="Ingrese correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            className="border p-2 block rounded-md w-full"
          />
        </div>

        <button
          className="
            bg-blue-600 text-white px-4 h-10 rounded-md
            w-full sm:col-span-2 md:w-auto
          "
        >
          {idEditar === null ? "Crear" : "Guardar"}
        </button>

      </form>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border min-w-700px">
          <thead className="bg-yellow-200">
            <tr>
              <th className="border p-2 text-left">Nombre</th>
              <th className="border p-2 text-left">Apellido</th>
              <th className="border p-2 text-left">Correo</th>
              <th className="border p-2 text-left">Rol</th>
              <th className="border p-2 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-blue-100">
                <td className="border p-2">{user.nombre}</td>
                <td className="border p-2">{user.apellido}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 text-center">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => editarUsuario(user)}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarUsuario(user.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default MostrarUsuarios;
