const mongoose = require("mongoose");
const service = require("../shared/service");
const Usuario = require("../models/usuario");
const Role = require("../models/role");
const Permission = require("../models/permission");
//const server = require('../app');// para probar manualmente


/**
 * Callback for adding two numbers.
 *
 * @callback autenticationToken(token)
 * @param {int} token - token for autentication.
 */

/**
 *@param {String} rol - Rol para el cual se desea crear el token
 *@param {autenticacionToken} - callback.
 */
function obtenerTokenParaRol(rol, callback) {
    Role.find({ nombre: rol }, (err, rol) => {
        if (err) console.log("error en ObtenerTokenParaRol")
        let usuario = new Usuario({
            nombre: "maximo",
            email: "maxi@gmail.com",
            password: "1234",
            role: rol[0]._id
        });
        usuario.save((err, user) => {
            callback(service.createToken(user));
        });
    })
}

function setUpPermisisYroles(callback) {
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
        }];
    Permission.insertMany(permisos, (err, perm) => {
        var roles = [
            {
                nombre: "Admin",
                permission: perm.map(valor => valor._id)//arreglo permisos de ids (todos)
            },
            {
                nombre: "Normal User",
                permission:[perm[1]._id,perm[5]._id,perm[7]._id]
            },
            {
                nombre: "Encargado de Productos",
                permission: [perm[8]._id,perm[9]._id]
            }
        ]
        Role.insertMany(roles, (err, roles) => {
            callback();
        })
    });
}
/**
 * @namespace
 * @property {String} Admin - Value: Admin
 * @property {String} EncProdu - Value: Encargado de Productos
 * @property {String} NormUser - Value: Normal User
 */
ROLES = {
    Admin: "Admin",
    EncProdu: "Encargado de Productos",
    NormUser: "Normal User"
}

module.exports = { setUpPermisisYroles, obtenerTokenParaRol, ROLES }