import { useNavigate } from "react-router-dom";
import { useState } from "react"

function FormularioUserCambiarContra() {
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [modalVisible, setModalVisible] = useState(false)
    const [modalMensaje, setModalMensaje] = useState("")
    const [esExito, setEsExito] = useState(false)

    function mostrarModal(mensaje, exito = false) {
        setModalMensaje(mensaje)
        setEsExito(exito)
        setModalVisible(true)
    }

    async function cambiarPassword() {
        if (newPassword !== confirmPassword) {
            mostrarModal("Las contraseñas no coinciden");
            console.log("Las contraseñas no coinciden")
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/usuarios/cambiar-password-autorizado", {
                method: "PUT",
                body: JSON.stringify({
                    email: localStorage.getItem("MAIL"),
                    old_password: password,
                    new_password: newPassword
                }), 
                headers: {
                    "x-token": localStorage.getItem("TOKEN"),
                    "content-type" : "application/json"
                }
            })

            const data = await response.json()
            if (response.ok) {
                console.log("Contraseña actualizada correctamente")
                mostrarModal("Contraseña actualizada correctamente", true)
            } else {
                console.log(data.detail)
                mostrarModal(data.detail)
            }
        } catch (error) {
            alert("Error de conexión con el servidor")
        }
     }

    function cerrarModal() {
        setModalVisible(false)
        if (esExito) {
            navigate("/usermainseguridad")
        }
    }

    async function CambiarContra() {
        const correo = localStorage.getItem("MAIL")
        const URL = "http://localhost:8000/usuarios/cambiar-password-autorizado/"

        let response
        response = await fetch(URL + correo, {
            method: "PUT",
            headers : {
                "x-token" : localStorage.getItem("TOKEN")
            }
        })

        if (!response.ok) {
            console.log("Error de petición. " + response.status)
                return
        }

        const data = await response.json()
        console.log(data.msg)
        navigate("/usermainseguridad")
    }

    return <div className="rounded-4xl shadow-md p-10 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 xs:w-1/2">
            <h1 className="text-4xl font-bold place-self-center mb-6"> Cambiar Contraseña </h1  >
            <div>
                <p className="my-6">Ingresa tu contraseña actual y tu nueva contraseña. Una vez completado te enviaremos un correo para confirmar la acción.</p>
                <form className="grid">
                    <label className="text-sm font-medium mb-1">Contraseña actual</label>
                    <input type="password" className="rounded-full bg-gray-200 px-4 py-1"
                    value={password}
                    onChange={function(e){setPassword(e.target.value)}}/>
                    <p className="text-sm mt-1 text-blue-900 hover:text-amber-600" 
                    onClick={ function(){ CambiarContra() } }> ¿Olvidaste tu contraseña? </p>

                    <label className="text-sm font-medium mb-1 mt-5">Nueva contraseña</label>
                    <input type="password" className="rounded-full bg-gray-200 px-4 py-1"
                    value={newPassword}
                    onChange={function(e){setNewPassword(e.target.value)}}/>

                    <label className="text-sm font-medium mb-1 mt-3">Confirmar contraseña</label>
                    <input type="password" className="rounded-full bg-gray-200 px-4 py-1"
                    value={confirmPassword}
                    onChange={function(e){setConfirmPassword(e.target.value)}}/>
                </form>

                <form className="flex justify-between items-center mt-6">
                    <button onClick={function(){navigate("/usermainseguridad")}} type="button" className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400">
                        Cancelar
                    </button>

                    <button onClick={ function(){ cambiarPassword() } } type="button" className="bg-yellow-300 px-6 py-2 rounded-full font-semibold text-black hover:bg-amber-600 hover:text-white">
                        Confirmar
                    </button>
                </form>
            </div>
            {modalVisible && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-80 text-center shadow-xl">
                        <p className="mb-4">{modalMensaje}</p>
                        <button onClick={cerrarModal}
                            className="px-4 py-2 rounded-full font-semibold bg-blue-500 text-white hover:bg-blue-600">
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
}

export default FormularioUserCambiarContra;
