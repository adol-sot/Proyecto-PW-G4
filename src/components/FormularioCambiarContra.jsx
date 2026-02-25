import { useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react"

function FormularioUserCambiarContra() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
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
        if (!token) {
            alert("Token inválido")
            return
        }

        if (password !== confirmPassword) {
            mostrarModal("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch("https://proyecto-pw-g4-backend-1.onrender.com/usuarios/cambiar-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token,
                    nueva_password: password
                })
            })

            const data = await response.json()

            if (response.ok) {
                mostrarModal("Contraseña actualizada correctamente", true)
            } else {
                mostrarModal(data.detail)
            }

        } catch (error) {
            alert("Error de conexión con el servidor")
        }
    }

    function cerrarModal() {
        setModalVisible(false)
        if (esExito) {
            navigate("/")
        }
    }

    return <div className="rounded-4xl shadow-md p-10 bg-white xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 xs:w-1/2">
        <h1 className="text-4xl font-bold flex justify-center mb-6">Cambiar Contraseña </h1>
        <p className="my-6">Ingresa tu nueva contraseña</p>
        <div className="grid">
            <label className="text-sm font-medium mb-1 mt-2">
                Nueva contraseña
            </label>
            <input type="password"
                className="rounded-full bg-gray-200 px-4 py-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <label className="text-sm font-medium mb-1 mt-3">
                Confirmar nueva contraseña
            </label>
            <input type="password"
                className="rounded-full bg-gray-200 px-4 py-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <div className="flex justify-between items-center mt-6">
            <button onClick={() => navigate("/")}
                type="button"
                className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400">
                Cancelar
            </button>

            <button onClick={cambiarPassword}
                type="button"
                className="bg-yellow-300 px-6 py-2 rounded-full font-semibold text-black hover:bg-amber-600 hover:text-white">
                Confirmar
            </button>
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

export default FormularioUserCambiarContra