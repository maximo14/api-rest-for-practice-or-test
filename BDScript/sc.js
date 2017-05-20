/*COMO USAR EL SCRIPT

Boton izquierdo del mouse sobre el script en el EXPLORADOR de VSCODE
apretamos abrir en simbolos del sistema y ejecutamos:
sc.js, recordando siempre vaciar la base de datos
*/





const mongoose = require("mongoose");
//para la conexion a mongo db
mongoose.connect("mongodb://localhost/tienda_productos");

// Use native promises -- Nose porque es esto pero ahce que ande
mongoose.Promise = global.Promise;

// fin de mongo db
//modelos
var Usuario = require("../models/usuario");
var Producto = require("../models/producto");
var DetalleVentas = require("../models/detalle-venta");
var Ventas = require("../models/venta");


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

///usuarios
var lsUsuarios = [
    {
        nombre: "Marianela",
        email: "mari@gmail.com",
        password: "1234"
    }, {
        nombre: "Juanjo",
        email: "juanjo@gmail.com",
        password: "1234"
    }, {
        nombre: "Felipe",
        email: "feli_fe@gmail.com",
        password: "1234"
    }
];
insert(Usuario, lsUsuarios, (elem) => {
    console.log(elem);
});
//fin usuarios


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
                nro: 3,
                producto: res[0]._id
            },
            {
                nro: 4,
                producto: res[1]._id
            }
        ];
        lsDetalle2 = [
            {
                nro: 3,
                producto: res[2]._id
            },
            {
                nro: 3,
                producto: res[3]._id
            }
        ];
        lsDetalle3 = [
            {
                nro: 30,
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
}, 3000);

setTimeout(() => {
    Usuario.find((err, user) => {
        DetalleVentas.find((err, detalles) => {          
            lsVentas = [
                {
                    nro_venta: 1,
                    cliente: user[0]._id,
                    detalleVenta: detalles[1]
                },
                {
                    nro_venta: 2,
                    cliente: user[0]._id,
                    detalleVenta: [detalles[2]._id,detalles[3]._id]
                },
                {
                    nro_venta: 3,
                    cliente: user[1]._id,
                    detalleVenta: [detalles[4]._id]
                }

            ]
            insert(Ventas, lsVentas, (elem) => {
                console.log(elem);
            });//fin insert
        });//fin DetalleVentas.find()
    });//fin Usuario.find()
}, 6000);//fin SetTimeout





