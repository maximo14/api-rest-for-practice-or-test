//how use: in shell mongo < dbDelete.js
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
db.counters.insertMany(lsContador)

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
    }
]
var perIds = db.permissions.insertMany(permisos)
var roles = [{
    nombre: "Admin",
    permission: [perIds.insertedIds[0], perIds.insertedIds[1],perIds.insertedIds[2],perIds.insertedIds[3]]
}]
var rolIds = db.roles.insertMany(roles)

var lsUsuarios = [
    {
        nombre: "marianela14",
        email: "mari@gmail.com",
        password: "1234",
        role: rolIds.insertedIds[0]
    }, {
        nombre: "juanjo14",
        email: "juanjo@gmail.com",
        password: "1234",
        role: rolIds.insertedIds[0]
    }, {
        nombre: "felipe14",
        email: "feli_fe@gmail.com",
        password: "1234",
        role: rolIds.insertedIds[0]
    }
];
var userIds = db.usuarios.insertMany(lsUsuarios)
//seguir con clientes...
show collections