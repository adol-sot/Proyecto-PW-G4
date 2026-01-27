// Funciones para guardar y obtener usuarios del localStorage

const STORAGE_KEY = 'gestion_gastos_usuarios'

// Obtener todos los usuarios
export function getUsers() {
    try {
        const usuarios = localStorage.getItem(STORAGE_KEY)
        if (usuarios) {
            return JSON.parse(usuarios)
        }
        return []
    } catch (error) {
        console.error('Error al leer usuarios:', error)
        return []
    }
}

// Guardar un nuevo usuario
export function saveUser(userData) {
    const usuarios = getUsers()
    
    // Verificar si el correo ya existe
    const correoExiste = usuarios.some(function(usuario) {
        return usuario.correo === userData.correo
    })
    
    if (correoExiste) {
        throw new Error('Este correo electrónico ya está registrado')
    }

    const nuevoUsuario = {
        id: Date.now().toString(),
        nombre: userData.nombre,
        correo: userData.correo,
        contraseña: userData.contraseña,
        rol: 'usuario',
        fechaRegistro: new Date().toISOString()
    }

    usuarios.push(nuevoUsuario)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios))
    
    return nuevoUsuario
}

// Autenticar un usuario
export function authenticateUser(correo, contraseña) {
    const usuarios = getUsers()
    const usuario = usuarios.find(function(u) {
        return u.correo === correo && u.contraseña === contraseña
    })
    
    if (usuario) {
        // Retornar usuario sin la contraseña
        const usuarioSinContraseña = {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
            fechaRegistro: usuario.fechaRegistro
        }
        return usuarioSinContraseña
    }
    
    return null
}

// Inicializar usuario administrador por defecto
export function initializeAdmin() {
    const usuarios = getUsers()
    const adminExiste = usuarios.some(function(u) {
        return u.correo === 'admin@admin.com'
    })
    
    if (!adminExiste) {
        const admin = {
            id: 'admin-001',
            nombre: 'Administrador',
            correo: 'admin@admin.com',
            contraseña: 'admin123',
            rol: 'admin',
            fechaRegistro: new Date().toISOString()
        }
        usuarios.push(admin)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios))
    }
}

// Inicializar usuarios de ejemplo
export function initializeSampleUsers() {
    const FLAG_KEY = 'usuarios_ejemplo_inicializados'
    
    // Verificar si ya se inicializaron
    if (localStorage.getItem(FLAG_KEY) === 'true') {
        return
    }

    const usuarios = getUsers()
    const ahora = new Date()
    
    // Lista de usuarios de ejemplo
    const usuariosEjemplo = [
        { nombre: 'María González', correo: 'maria.gonzalez@email.com', contraseña: 'password123' },
        { nombre: 'Juan Pérez', correo: 'juan.perez@email.com', contraseña: 'password123' },
        { nombre: 'Ana Martínez', correo: 'ana.martinez@email.com', contraseña: 'password123' },
        { nombre: 'Carlos Rodríguez', correo: 'carlos.rodriguez@email.com', contraseña: 'password123' },
        { nombre: 'Laura Sánchez', correo: 'laura.sanchez@email.com', contraseña: 'password123' },
        { nombre: 'Diego Fernández', correo: 'diego.fernandez@email.com', contraseña: 'password123' },
        { nombre: 'Sofía López', correo: 'sofia.lopez@email.com', contraseña: 'password123' },
        { nombre: 'Miguel Torres', correo: 'miguel.torres@email.com', contraseña: 'password123' },
        { nombre: 'Isabella Ramírez', correo: 'isabella.ramirez@email.com', contraseña: 'password123' },
        { nombre: 'Andrés Morales', correo: 'andres.morales@email.com', contraseña: 'password123' },
        { nombre: 'Valentina Castro', correo: 'valentina.castro@email.com', contraseña: 'password123' },
        { nombre: 'Sebastián Herrera', correo: 'sebastian.herrera@email.com', contraseña: 'password123' },
        { nombre: 'Camila Jiménez', correo: 'camila.jimenez@email.com', contraseña: 'password123' },
        { nombre: 'Nicolás Vargas', correo: 'nicolas.vargas@email.com', contraseña: 'password123' },
        { nombre: 'Daniela Ruiz', correo: 'daniela.ruiz@email.com', contraseña: 'password123' }
    ]

    // Distribuir usuarios en los últimos 12 meses
    // Más usuarios en meses recientes
    const distribucion = [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0]
    
    let indiceUsuario = 0
    
    // Crear usuarios distribuidos en los últimos 12 meses
    for (let mesOffset = 11; mesOffset >= 0; mesOffset--) {
        const usuariosEnMes = distribucion[mesOffset]
        
        for (let i = 0; i < usuariosEnMes && indiceUsuario < usuariosEjemplo.length; i++) {
            const usuarioEjemplo = usuariosEjemplo[indiceUsuario]
            
            // Verificar que el correo no exista ya
            const correoExiste = usuarios.some(function(u) {
                return u.correo === usuarioEjemplo.correo
            })
            if (correoExiste) {
                indiceUsuario++
                continue
            }
            
            // Crear fecha aleatoria dentro del mes
            const fechaObjetivo = new Date(ahora.getFullYear(), ahora.getMonth() - mesOffset, 1)
            const diasEnMes = new Date(fechaObjetivo.getFullYear(), fechaObjetivo.getMonth() + 1, 0).getDate()
            const diaAleatorio = Math.floor(Math.random() * diasEnMes) + 1
            
            const fechaRegistro = new Date(
                fechaObjetivo.getFullYear(),
                fechaObjetivo.getMonth(),
                diaAleatorio
            )
            
            const nuevoUsuario = {
                id: 'ejemplo-' + Date.now() + '-' + indiceUsuario,
                nombre: usuarioEjemplo.nombre,
                correo: usuarioEjemplo.correo,
                contraseña: usuarioEjemplo.contraseña,
                rol: 'usuario',
                fechaRegistro: fechaRegistro.toISOString()
            }
            
            usuarios.push(nuevoUsuario)
            indiceUsuario++
        }
    }
    
    // Guardar usuarios
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios))
    
    // Marcar como inicializado
    localStorage.setItem(FLAG_KEY, 'true')
}

// Obtener total de usuarios
export function getTotalUsers() {
    return getUsers().length
}

// Obtener usuarios del mes actual
export function getUsersThisMonth() {
    const usuarios = getUsers()
    const ahora = new Date()
    const mesActual = ahora.getMonth()
    const añoActual = ahora.getFullYear()
    
    const usuariosEsteMes = usuarios.filter(function(usuario) {
        const fechaUsuario = new Date(usuario.fechaRegistro)
        return fechaUsuario.getMonth() === mesActual && fechaUsuario.getFullYear() === añoActual
    })
    
    return usuariosEsteMes.length
}

// Obtener usuarios agrupados por mes para el gráfico
export function getUsersByMonth(months) {
    const usuarios = getUsers()
    const ahora = new Date()
    const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    
    // Crear objeto para contar usuarios por mes
    const usuariosPorMes = {}
    
    // Inicializar los últimos N meses con 0
    for (let i = months - 1; i >= 0; i--) {
        const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1)
        const claveMes = fecha.getFullYear() + '-' + fecha.getMonth()
        usuariosPorMes[claveMes] = {
            year: fecha.getFullYear(),
            month: fecha.getMonth(),
            monthName: nombresMeses[fecha.getMonth()],
            count: 0
        }
    }
    
    // Contar usuarios por mes
    usuarios.forEach(function(usuario) {
        const fechaUsuario = new Date(usuario.fechaRegistro)
        const claveMes = fechaUsuario.getFullYear() + '-' + fechaUsuario.getMonth()
        
        if (usuariosPorMes[claveMes]) {
            usuariosPorMes[claveMes].count++
        }
    })
    
    // Convertir a array para el gráfico
    const resultado = []
    for (let clave in usuariosPorMes) {
        const item = usuariosPorMes[clave]
        resultado.push({
            mes: item.monthName,
            usuarios: item.count,
            mesCompleto: item.monthName + ' ' + item.year
        })
    }
    
    return resultado
}
