function ConfirmacionInicioSesion() {
    return <div class="bg-white rounded-md p-8 max-w-md w-full text-center shadow-2xl">
        
        <h1 class="text-3xl md:text-4xl font-bold text-black mb-6 ">
            Confirmacion de inicio de sesion
        </h1>
        
        <p class="text-lg md:text-xl text-gray-800 mb-10  px-4">
            Se ha detectado un inicio de sesion el dia xx/xx/xx a las xx:xx horas. Para confirmar el inicio de sesion, confirme
        </p>
        
        <button class="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-2xl py-4 rounded-full shadow-md mb-8">
            Confirmar
        </button>
        
        <p class="text-sm text-gray-600 italic px-4">
            Si no es usted se recomienda que tome medidas de seguridad para protejer su cuenta
        </p>
    </div>

}

export default ConfirmacionInicioSesion