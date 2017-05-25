//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");


//modelos
var Usuario = require("./models/usuario");
var Producto = require("./models/producto");
var DetalleVentas = require("./models/detalle-venta");
var Ventas = require("./models/venta");
var Counter = require("./models/counter");

//controladores
const router_usuario = require('./controlers/ctr_usuarios');
const router_producto = require('./controlers/ctr_producto');
const router_venta = require('./controlers/ctr_ventas');
const router_cliente = require('./controlers/ctr_cliente');

const app = express();


//para la conexion a mongo db
mongoose.connect("mongodb://localhost/tienda_productos");

// Use native promises -- Nose porque es esto pero ahce que ande
mongoose.Promise = global.Promise;
// fin de mongo db

/**
 app.get("/ventas", function (req, res) {
        Ventas.findOne()
                .populate('cliente')
                .populate({ path: 'detalleVenta', populate: { path: 'producto' } })
                .exec((err, venta) => {
                        res.status(200).send(venta);
                });
});
 */


//midleware
//hago que express use body-parser para poder acceder a los elementos del html
app.use(bodyParser.urlencoded({ extended: false }));
//funcion del body parser para el manejo de JSON
app.use(bodyParser.json());

//
app.use(methodOverride());


//routers
app.use("/api", router_usuario);
app.use("/api", router_producto);
app.use("/api", router_venta);
app.use("/api", router_cliente);


app.listen(3000, () => {
        console.log("Server funcionando");
})