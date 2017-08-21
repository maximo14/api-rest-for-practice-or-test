//how use: in shell mongo < dbManger.js
use tienda_productos
db.productos.drop()
db.detalleventas.drop()
db.clientes.drop()
db.ventas.drop()
db.usuarios.drop()
db.counters.drop()
db.permissions.drop()
db.roles.drop()

///contadores
var lsContador = [{
    _id: 'ventas',
    seq: 1
}];
var counterIds = db.counters.insertMany(lsContador)

var permisos = [
    {
        ruta: "/api/ventas",
        acciones: ["GET", "POST"]
    },
    {
        ruta: "/api/ventas/:id",
        acciones: ["GET", "PUT", "DELETE"]
    }, {
        ruta: "/api/productos",
        acciones: ["GET", "POST"]
    },
    {
        ruta: "/api/productos/:id",
        acciones: ["GET", "PUT", "DELETE"]
    },
    {
        ruta: "/api/roles",
        acciones: ["GET", "POST"]
    },
    {
        ruta: "/api/roles/:id",
        acciones: ["GET", "PUT" ,"DELETE"]
    },
    {
        ruta: "/api/permissions",
        acciones: ["GET", "POST"]
    },
    {
        ruta: "/api/permissions/:id",
        acciones: ["GET", "PUT" ,"DELETE"]
    }

]
var perIds = db.permissions.insertMany(permisos)
var roles = [{
    nombre: "Admin",
    permission: perIds.insertedIds//arreglo permisos de ids (todos)
}]
var rolIds = db.roles.insertMany(roles)

var lsUsuarios = [
    {
        nombre: "marianela14",
        email: "mari@gmail.com",
        password: "$2a$10$ZivrIkaaHo2jh63x/2Iciu6Ec2f0r9BR44n/iglvA7tDEeagr7vja",
        role: rolIds.insertedIds[0]
    }, {
        nombre: "juanjo14",
        email: "juanjo@gmail.com",
        password: "$2a$10$dyi8eDiktqkHkO7f3Rkp3eTgvaOhq.4jTFFCNgK1FbbhFy2LKJtNq",
        role: rolIds.insertedIds[0]
    }, {
        nombre: "felipe14",
        email: "feli_fe@gmail.com",
        password: "$2a$10$wN6WxcSH04Ethw545mH9.eLjMYHr5A1AwX.Dh8AE/f6qCQLvmQIcm",
        role: rolIds.insertedIds[0]
    }
];
var userIds = db.usuarios.insertMany(lsUsuarios)

var lsCliente = [
    {
        nombre: "Marianela",
        apellido: "Fiora",
        dni: "40856789",
        usuario: userIds.insertedIds[0]
    }, {
        nombre: "Juanjo",
        apellido: "Lorenzatti",
        dni: "36795851",
        usuario: userIds.insertedIds[1]
    }, {
        nombre: "Felipe",
        apellido: "Ferreyra",
        dni: "37789521",
        usuario: userIds.insertedIds[2]
    }
]
var clientesIds = db.clientes.insertMany(lsCliente)

var lsProcutos = [
    {
        nombre: "Billetera",
        marca: "nike",
        precio: 15
    }, {
        nombre: "Campera",
        marca: "Aswer",
        precio: 120
    }, {
        nombre: "Fernet",
        marca: "Veneto",
        precio: 98
    }, {
        nombre: "Cuaderno tapa dura",
        marca: "Saveedra",
        precio: 12.80
    }, {
        nombre: "Estabilizador",
        marca: "Macromack",
        precio: 750
    }
]
var productosIds = db.productos.insertMany(lsProcutos)

var lsDetalle = [
    {
        cant: 3,
        producto: productosIds.insertedIds[0]
    },
    {
        cant: 4,
        producto: productosIds.insertedIds[1]
    },
    {
        cant: 3,
        producto: productosIds.insertedIds[2]
    },
    {
        cant: 3,
        producto: productosIds.insertedIds[3]
    },
    {
        cant: 30,
        producto: productosIds.insertedIds[4]
    }
]

var detalleIds = db.detalleventas.insertMany(lsDetalle)
var lsVentas = [
    {
        //nro_venta: 1,
        cliente: clientesIds.insertedIds[0],
        detalleVenta: [detalleIds.insertedIds[0]]
    },
    {
        //nro_venta: 2,
        cliente: clientesIds.insertedIds[0],
        detalleVenta: [detalleIds.insertedIds[2], detalleIds.insertedIds[3]]
    },
    {
        //nro_venta: 3,
        cliente: clientesIds.insertedIds[1],
        detalleVenta: [detalleIds.insertedIds[4]]
    }
]
var ventaIds = db.ventas.insertMany(lsVentas)

show collections