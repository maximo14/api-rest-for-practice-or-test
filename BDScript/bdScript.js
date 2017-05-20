module.exports = () => {

    //modelos
    var Usuario = require("../models/usuario");
    var Producto = require("../models/producto");
    var DetalleVentas = require("../models/detalle-venta");
    var Ventas = require("../models/venta");
    //
    var ids_usuarios = [];
    var ids_productos = [];
    var ids_detalle_venta1 = [];
    var ids_detalle_venta2 = [];
    var ids_detalle_venta3 = [];

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
        ids_usuarios.push(elem._id);
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
        console.log(elem);
        ids_productos.push(elem._id);
    });
    //fin producto




    //detalle-ventas
    lsDetalle1 = [
        {
            nro: 3,
            producto: ids_productos[0]
        },
        {
            nro: 4,
            producto: ids_productos[1]
        }
    ];
    lsDetalle2 = [
        {
            nro: 3,
            producto: ids_productos[2]
        },
        {
            nro: 3,
            producto: ids_productos[3]
        }
    ];
    lsDetalle3 = [
        {
            nro: 30,
            producto: ids_productos[5]
        }

    ];

    insert(DetalleVentas, lsDetalle1, (elem) => {
        console.log(elem);
        ids_detalle_venta1.push(elem);
    });
    insert(DetalleVentas, lsDetalle2, (elem) => {
        console.log(elem);
        ids_detalle_venta2.push(elem);
    });

    insert(DetalleVentas, lsDetalle3, (elem) => {
        console.log(elem);
        ids_detalle_venta3.push(elem);
    });
    //fin detalle-ventas
    



}