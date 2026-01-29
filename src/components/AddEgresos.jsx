function AddEgresos() {
    return <div className="border-2 rounded-4xl border-gray-300 shadow-md p-10 my-5 bg-white xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-4/5 place-self-center">
        <h2 className="text-xl font-bold text-center">Registrar Egreso</h2>
        <hr className="my-5"></hr>
        <form className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-y-2 text-center">
            <label className="ml-1">Fecha:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="date"/>

            <label className="ml-1">Monto:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="number"/>

            <label className="ml-1">Categoría:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="text"/>

            <label className="ml-1">Descripción:</label>
            <input className="border border-gray-300 rounded-md bg-gray-300 px-2 py-1 text-sm text-center" type="text"/>
        </form>

        <form className="flex justify-center">
            <button className="mt-5 bg-yellow-300 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full xs:w-full rounded-full py-2 px-2 text-black font-bold text-2xl hover:bg-amber-600 hover:text-white" type="button">
                Registrar
            </button>
        </form>
    </div>
}

export default AddEgresos