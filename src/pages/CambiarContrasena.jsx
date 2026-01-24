import CuerpoCambiarContra from "../components/CuerpoCambiarContra"
import TituloCambioContra from "../components/TituloCambioContra"

function CambiarContrasena(){
    return <div className="flex justify-center items-center bg-blue-900 min-h-screen">
        <div className="rounded-4xl shadow-md p-10 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2">
            <TituloCambioContra />
            <CuerpoCambiarContra />
        </div>
    </div>
}

export default CambiarContrasena