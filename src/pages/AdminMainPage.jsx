import MostrarUsuarios from "../components/MostrarUsuarios";


function AdminMainPage () {
  return <div className="min-h-screen bg-gray-100 p-6">
      <div><h1 className="text-3xl font-bold mb-6">
        Panel de Administración
      </h1>

      <MostrarUsuarios />
      </div>
    </div>
  ;
};

export default AdminMainPage;