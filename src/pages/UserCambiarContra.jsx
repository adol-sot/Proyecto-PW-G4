import { useNavigate } from "react-router-dom"
import FormularioUserCambiarContra from "../components/FormularioUserCambiarContra"

function UserCambiarContra(){

    const navigate = useNavigate()

    return <div className="flex justify-center items-center bg-blue-900 min-h-screen">
        <FormularioUserCambiarContra/>
    </div>
}

export default UserCambiarContra