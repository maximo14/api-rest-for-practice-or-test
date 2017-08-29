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
    {//0
        ruta: "/api/clientes",
        acciones: ["GET", "POST"]
    },
    {//1
        ruta: "/api/clientes",
        acciones: ["GET"]
    },
    {//2
        ruta: "/api/clientes/:id",
        acciones: ["GET", "PUT", "DELETE"]
    },
    {//3
        ruta: "/api/usuarios",
        acciones: ["GET", "POST"]
    },
    {//4
        ruta: "/api/usuarios/:id",
        acciones: ["GET", "PUT", "DELETE"]
    },
    {//5
        ruta: "/api/ventas",
        acciones: ["GET", "POST"]
    },
    {//6
        ruta: "/api/ventas/:id",
        acciones: ["GET", "PUT", "DELETE"]
    },
    {//7
        ruta: "/api/ventas/:id",
        acciones: ["GET"]
    },
    {//8
        ruta: "/api/productos",
        acciones: ["GET", "POST"]
    },
    {//9
        ruta: "/api/productos/:id",
        acciones: ["GET", "PUT", "DELETE"]
    },
    {//10
        ruta: "/api/roles",
        acciones: ["GET", "POST"]
    },
    {//11
        ruta: "/api/roles/:id",
        acciones: ["GET", "PUT", "DELETE"]
    },
    {//12
        ruta: "/api/permissions",
        acciones: ["GET", "POST"]
    },
    {//13
        ruta: "/api/permissions/:id",
        acciones: ["GET", "PUT", "DELETE"]
    }]
var perIds = db.permissions.insertMany(permisos)
var roles = [
    {
        nombre: "Admin",
        permission: perIds.insertedIds//arreglo permisos de ids (todos)
    },
    {
        nombre: "Encargado de Productos",
        permission: [perIds.insertedIds[8], perIds.insertedIds[9]]//arreglo permisos de ids (todos)
    },
    {
        nombre: "Normal User",
        permission: [perIds.insertedIds[1], perIds.insertedIds[5],perIds.insertedIds[7]]//arreglo permisos de ids (todos)
    }]
var rolIds = db.roles.insertMany(roles)

var lsUsuarios = [
    {
        nombre: "marianela14",
        email: "mari@gmail.com",
        password: "$2a$10$ZivrIkaaHo2jh63x/2Iciu6Ec2f0r9BR44n/iglvA7tDEeagr7vja",//1234
        role: rolIds.insertedIds[0]
    }, {
        nombre: "juanjo14",
        email: "juanjo@gmail.com",
        password: "$2a$10$dyi8eDiktqkHkO7f3Rkp3eTgvaOhq.4jTFFCNgK1FbbhFy2LKJtNq",//1234
        role: rolIds.insertedIds[1]
    }, {
        nombre: "felipe14",
        email: "feli_fe@gmail.com",
        password: "$2a$10$wN6WxcSH04Ethw545mH9.eLjMYHr5A1AwX.Dh8AE/f6qCQLvmQIcm",//1234
        role: rolIds.insertedIds[2]
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
        precio: 15,
        foto: "https://www.renzocosta.com/media_rc/uploads/productos/hombre/billeteras/billetera-cuero-hombre-negro-verde-wcs-14-14100127-01.jpg"
    }, {
        nombre: "Campera",
        marca: "Aswer",
        precio: 120,
        foto:"http://www.ansilta.com/img/articulos/campera_nova_c_cap_25_small_thumb4.jpg"
    }, {
        nombre: "Fernet",
        marca: "Veneto",
        precio: 98,
        foto: "https://ugc.kn3.net/i/origin/https://i.ytimg.com/vi/3CKfzH0Qw2c/maxresdefault.jpg"
    }, {
        nombre: "Cuaderno tapa dura",
        marca: "Saveedra",
        precio: 12.80,
        foto:"http://www.cuadernosempresarialesperu.com/img/productos/000001/cuadernos-americano_-1465481771.jpg"
    }, {
        nombre: "Estabilizador",
        marca: "Macromack",
        precio: 750,
        foto:"http://fravega.vteximg.com.br/arquivos/ids/278482-1000-1000/ESTABILIZADOR-TRV-CONCEPT-1000V-AV-USB.jpg"
    }, {
        nombre: "Tijeras",
        marca: "Fendora",
        precio: 50,
        foto:"http://www.aceros-de-hispania.com/imagen/tijera-escolar-zurdos/tijera-zurdo-186.jpg"
    }, {
        nombre: "Papas Fritas",
        marca: "Lays",
        precio: 45,
        foto:"http://www.tata.com.uy/Files//Image/Product/290x290_P/635949141483783406.png"
    }, {
        nombre: "Sombero de Color",
        marca: "Shouyled",
        precio: 550,
        foto:"http://www.gorrosysombreros.com/1211-thickbox_default/sombrero-tango-color-con-cinta-negra.jpg"
    }, {
        nombre: "Resaltador",
        marca: "Color shot",
        precio: 25,
        foto: "https://www.staples.com.ar/images/pg/RESSSHYC5S_2.jpg?"
    }, {
        nombre: "Pie de guitarra",
        marca: "gipson",
        precio: 25,
        foto: "http://www.mjmusic.com.ar/theme/img/p/1127-1525-thickbox.jpg"
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
        cliente: clientesIds.insertedIds[1],
        detalleVenta: [detalleIds.insertedIds[0]]
    },
    {
        //nro_venta: 2,
        cliente: clientesIds.insertedIds[1],
        detalleVenta: [detalleIds.insertedIds[2], detalleIds.insertedIds[3]]
    },
    {
        //nro_venta: 3,
        cliente: clientesIds.insertedIds[2],
        detalleVenta: [detalleIds.insertedIds[4]]
    }
]
var ventaIds = db.ventas.insertMany(lsVentas)

show collections