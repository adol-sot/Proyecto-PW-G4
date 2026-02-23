import { useNavigate } from "react-router-dom"
import { useState } from "react"

function CuerpoCambiarContra() {
    const navigate = useNavigate()

    const [correo, setCorreo] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [mensajeModal, setMensajeModal] = useState("")
    const [esError, setEsError] = useState(false)

    async function solicitarRecuperacion() {
        try {
            const response = await fetch(
                "http://localhost:8000/usuarios/solicitar-recuperacion",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: correo })
                }
            )

            const data = await response.json()

            if (response.ok) {
                setMensajeModal("Se envió el enlace de recuperación correctamente.")
                setEsError(false)
            } else if (response.status === 404) {
                // Usuario no encontrado
                setMensajeModal("No se encontró una cuenta asociada a este correo. Introducir un correo válido")
                setEsError(true)
            } else {
                // Otros errores
                setMensajeModal(data.detail)
                setEsError(true)
            }

            setModalVisible(true)

        } catch (error) {
            // Error de red o inesperado
            setMensajeModal("No se pudo conectar con el servidor.")
            setEsError(true)
            setModalVisible(true)
        }
    }

    return <div>
        <p className="my-6">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        <div className="grid">
            <label className="text-sm font-medium mb-1">Correo</label>
            <input type="email" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                className="w-full rounded-full bg-gray-200 px-4 py-1"/>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center mt-6">
            <button onClick={function(){navigate("/")}} 
                    type="button" 
                    className="w-full sm:w-auto bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400">
                Cancelar
            </button>
            <button onClick={solicitarRecuperacion} 
                    type="button" 
                    className="w-full sm:w-auto bg-yellow-300 px-6 py-2 rounded-full font-semibold text-black hover:bg-amber-600 hover:text-white">
                <span className="md:hidden">Enviar enlace</span>
                <span className="hidden md:inline">Enviar enlace de recuperación</span>
            </button>
        </div>
        {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70">
                    <div className="bg-white rounded-4xl p-6 w-80 text-center">
                        <h2 className={`text-lg font-semibold mb-4 ${esError ? "text-red-600" : "text-black"}`}>
                            {esError ? "Error" : "Éxito"}
                        </h2>

                        <p className="mb-6">{mensajeModal}</p>

                        <button
                            onClick={() => setModalVisible(false)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
    </div>
}

export default CuerpoCambiarContra