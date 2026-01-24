function FormularioLogin() {
    return <form className="mt-6 px-10">
        <div className="grid grid-cols-1">
            <label className="ml-1">Correo</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" type="text" />
        </div>
        <div className="grid grid-cols-1 mt-4">
            <label className="ml-1"> Contraseña </label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm" type="password" />
            <p className="text-sm mt-1"> ¿Olvidaste tu contraseña? </p>
        </div>
        <div className="mt-4">
            <button className="mt-4 bg-yellow-300 w-full rounded-full py-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white">
                Ingresar
            </button>
        </div>
        <div>
            <p className="text-sm mt-4 place-self-center"> ¿No tienes una cuenta? </p>
        </div>
    </form>
}

export default FormularioLogin