import CuerpoCambiarContra from "../components/CuerpoCambiarContra"
import TituloCambioContra from "../components/TituloCambioContra"

function CambiarContrasena(){
    return <div className="flex justify-center items-center bg-blue-900 min-h-screen">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md rounded-4xl shadow-md p-6 bg-white">
            <TituloCambioContra />
            <CuerpoCambiarContra />
        </div>
    </div>
}

export default CambiarContrasena