const BASE_URL = "http://localhost:8000";


export async function obtenerGraficoCategoria(usuarioId: string) {
    const response = await fetch(`${BASE_URL}/grafico/categoria/${usuarioId}`);

    if (!response.ok) {
        throw new Error("Error al obtener gráfico por categoría");
    }

    const data = await response.json();
    return data.data;
}


export async function obtenerGraficoMensual(usuarioId: string) {
    const response = await fetch(`${BASE_URL}/grafico/mensual/${usuarioId}`);

    if (!response.ok) {
        throw new Error("Error al obtener gráfico mensual");
    }

    const data = await response.json();
    return data.data;
}


export async function obtenerEgresos(usuarioId: string) {
    const response = await fetch(`${BASE_URL}/expenses/${usuarioId}`);

    if (!response.ok) {
        throw new Error("Error al obtener egresos");
    }

    const data = await response.json();
    return data.data;
}


export async function solicitarRecuperacion(email: string) {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error("Error al solicitar recuperación");
    }

    return await response.json();
}


export async function cambiarPassword(token: string, nuevaPassword: string) {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token,
            new_password: nuevaPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Error al cambiar contraseña");
    }

    return await response.json();
}

export async function editarEgreso(usuarioId: string, egresoId: string, datosEgreso: any) {
    const response = await fetch(`${BASE_URL}/expenses/${usuarioId}/${egresoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEgreso),
    });

    if (!response.ok) {
        throw new Error("Error al editar egreso");
    }

    return await response.json();
}