function AdminMainPage() {
    return <h1>Bienvenido, Administrador</h1>
}
return <div className="flex justify-center bg-blue-900 shadow-lg min-h-screen">
<div className="border-2 rounded-4xl border-gray-300 shadow-md p-10 my-20 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2"> 
    <img  className="w-2/3 place-self-center" src="/imagenes/Palisade_Logo2.jpeg"/> 
    <TituloLogin />
    <FormularioLogin onLogin={ login }/>
</div>
</div>
export default AdminMainPage