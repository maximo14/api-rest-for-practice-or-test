//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

//config
const config = require("./config");

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
const router_autho = require('./controlers/ctr_autho');





const app = express();


//para la conexion a mongo db
mongoose.connect(config.MONGO_PATH);

// Use native promises -- Nose porque es esto pero ahce que ande
mongoose.Promise = global.Promise;
// fin de mongo db

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
app.use("/api", router_autho);


app.listen(3000, () => {
        console.log("Server funcionando");
})