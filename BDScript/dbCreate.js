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
    modelo.create(listaObetos, (err, res) => {
        if (err) console.log(err);
        else {
            res.forEach((elem) => {
                callback(elem);
            })
        }
    });
}
//fin funciones auxiliares
//timeout para q limpie primero
setTimeout(() => {
    ///contadores
    var lsContador = [{
        _id: 'ventas',
        seq: 1
    }];

    insert(Counter, lsContador, (elem) => {
        console.log(elem);
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
    insert(Permission, permisos, (elem) => {
        console.log(elem);
    });

    setTimeout(() => {
        Permission.find((err, per) => {
            listper = []

            var rol = [{
                nombre: "Admin",
                permission: [per[0]._id, per[1]._id, per[2]._id, per[3]._id]
            }];
            insert(Role, rol, (elem) => {
                console.log(elem);
            })

        });
    }, 3000);




    ///usuarios

    setTimeout(() => {
        Role.find((err, rol) => {
            var lsUsuarios = [
                {
                    nombre: "marianela14",
                    email: "mari@gmail.com",
                    password: "1234",
                    role: rol[0]._id
                }, {
                    nombre: "juanjo14",
                    email: "juanjo@gmail.com",
                    password: "1234",
                    role: rol[0]._id
                }, {
                    nombre: "felipe14",
                    email: "feli_fe@gmail.com",
                    password: "1234",
                    role: rol[0]._id
                }
            ];
            insert(Usuario, lsUsuarios, (elem) => {
                console.log(elem);
            });
        })
    }, 6000);




    //fin usuarios

    setTimeout(() => {
        Usuario.find((err, user) => {
            //clientes
            var lsCliente = [
                {
                    nombre: "Marianela",
                    apellido: "Fiora",
                    dni: "40856789",
                    usuario: user[0]._id
                }, {
                    nombre: "Juanjo",
                    apellido: "Lorenzatti",
                    dni: "36795851",
                    usuario: user[1]._id
                }, {
                    nombre: "Marianela",
                    apellido: "Fiora",
                    dni: "37789521",
                    usuario: user[2]._id
                }
            ]
            insert(Cliente, lsCliente, (elem) => {
                console.log(elem);
            });
        });//fin Usuario.find()
    }, 9000);//fin SetTimeout


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
    });
    //fin producto

    //espera 3segundos para hacer la insercion porque sino se pueden joder con la
    //asincronizidad
    setTimeout(() => {
        Producto.find((err, res) => {
            lsDetalle1 = [
                {
                    cant: 3,
                    producto: res[0]._id
                },
                {
                    cant: 4,
                    producto: res[1]._id
                }
            ];
            lsDetalle2 = [
                {
                    cant: 3,
                    producto: res[2]._id
                },
                {
                    cant: 3,
                    producto: res[3]._id
                }
            ];
            lsDetalle3 = [
                {
                    cant: 30,
                    producto: res[4]._id
                }

            ];

            insert(DetalleVentas, lsDetalle1, (elem) => {
                console.log(elem);
            });
            insert(DetalleVentas, lsDetalle2, (elem) => {
                console.log(elem);
            });

            insert(DetalleVentas, lsDetalle3, (elem) => {
                console.log(elem);
            });
        });
    }, 12000);

    setTimeout(() => {
        Usuario.find((err, user) => {
            DetalleVentas.find((err, detalles) => {
                lsVentas = [
                    {
                        //nro_venta: 1,
                        cliente: user[0]._id,
                        detalleVenta: detalles[1]
                    },
                    {
                        //nro_venta: 2,
                        cliente: user[0]._id,
                        detalleVenta: [detalles[2]._id, detalles[3]._id]
                    },
                    {
                        //nro_venta: 3,
                        cliente: user[1]._id,
                        detalleVenta: [detalles[4]._id]
                    }

                ]
                insert(Ventas, lsVentas, (elem) => {
                    console.log(elem);
                });//fin insert
            });//fin DetalleVentas.find()
        });//fin Usuario.find()
    }, 15000);//fin SetTimeout
}, 3000);

