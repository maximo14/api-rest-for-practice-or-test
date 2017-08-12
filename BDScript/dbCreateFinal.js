/*COMO USAR EL SCRIPT

Boton izquierdo del mouse sobre el script en el EXPLORADOR de VSCODE
apretamos abrir en simbolos del sistema y ejecutamos:
sc.js, recordando siempre vaciar la base de datos
*/
const mongoose = require("mongoose");
const config = require("../config");
//para la conexion a mongo db
mongoose.connect(config.MONGO_PATH);

// Use native promises -- Nose porque es esto pero ahce que ande
mongoose.Promise = global.Promise;

// fin de mongo db
//modelos
var Usuario = require("../models/usuario");
var Cliente = require("../models/cliente");
var Producto = require("../models/producto");
var DetalleVentas = require("../models/detalle-venta");
var Ventas = require("../models/venta");
var Counter = require("../models/counter");
var Permission = require("../models/permission");
var Role = require("../models/role");

Usuario.collection.drop();
Cliente.collection.drop();
Producto.collection.drop();
Ventas.collection.drop();
DetalleVentas.collection.drop();
Counter.collection.drop();
Permission.collection.drop();
Role.collection.drop();

//funciones auxiliares
var insert = (modelo, listaObetos, callback) => {
    modelo.create(listaObetos, (err, listElem) => {
        if (err) console.log(err);
        else {
            callback(listElem);
        }
    });
}

var showAllElemt = (list) => {
    list.forEach((elem) => {
        console.log(elem)
    })
}

setTimeout(() => {
    ///contadores
    var lsContador = [{
        _id: 'ventas',
        seq: 1
    }];

    insert(Counter, lsContador, (listElem) => {
        showAllElemt(listElem);
    });
    ///fin contadores

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
    insert(Permission, permisos, (listElem) => {
        showAllElemt(listElem)
        var rol = [{
            nombre: "Admin",
            permission: [listElem[0]._id, listElem[1]._id, listElem[2]._id, listElem[3]._id]
        }];
        insert(Role, rol, (listaObetos) => {
            showAllElemt(listaObetos);
            var lsUsuarios = [
                {
                    nombre: "marianela14",
                    email: "mari@gmail.com",
                    password: "1234",
                    role: listaObetos[0]._id
                }, {
                    nombre: "juanjo14",
                    email: "juanjo@gmail.com",
                    password: "1234",
                    role: listaObetos[0]._id
                }, {
                    nombre: "felipe14",
                    email: "feli_fe@gmail.com",
                    password: "1234",
                    role: listaObetos[0]._id
                }
            ];
            insert(Usuario, lsUsuarios, (elem) => {
                showAllElemt(elem)
                //clientes
                var lsCliente = [
                    {
                        nombre: "Marianela",
                        apellido: "Fiora",
                        dni: "40856789",
                        usuario: elem[0]._id
                    }, {
                        nombre: "Juanjo",
                        apellido: "Lorenzatti",
                        dni: "36795851",
                        usuario: elem[1]._id
                    }, {
                        nombre: "Marianela",
                        apellido: "Fiora",
                        dni: "37789521",
                        usuario: elem[2]._id
                    }
                ]
                insert(Cliente, lsCliente, (elem) => {
                    showAllElemt(elem)
                    this.user=elem;
                    //producto
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
                    ];
                    insert(Producto, lsProcutos, (elem) => {
                        showAllElemt(elem)
                        lsDetalle = [
                            {
                                cant: 3,
                                producto: elem[0]._id
                            },
                            {
                                cant: 4,
                                producto: elem[1]._id
                            },
                            {
                                cant: 3,
                                producto: elem[2]._id
                            },
                            {
                                cant: 3,
                                producto: elem[3]._id
                            },
                            {
                                cant: 30,
                                producto: elem[4]._id
                            }
                        ];
                        insert(DetalleVentas, lsDetalle, (elem) => {
                            showAllElemt(elem)
                            lsVentas = [
                                {
                                    //nro_venta: 1,
                                    cliente: this.user[0]._id,
                                    detalleVenta:elem[1]
                                },
                                {
                                    //nro_venta: 2,
                                    cliente: this.user[0]._id,
                                    detalleVenta: [elem[2]._id, elem[3]._id]
                                },
                                {
                                    //nro_venta: 3,
                                    cliente: this.user[1]._id,
                                    detalleVenta: [elem[4]._id]
                                }

                            ]
                            insert(Ventas, lsVentas, (elem) => {
                               showAllElemt(elem)
                               process.exit(0);//finaliza la carga
                            });
                        });
                    });
                });
            });
        })
    });

}, 3000)