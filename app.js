//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Mockgoose = require('mockgoose').Mockgoose;//para el mock de db se datos
const methodOverride = require("method-override");
const authorization = require("./midleware/authorization");

//config
const config = require("./config");

//modelos
var Usuario = require("./models/usuario");
var Producto = require("./models/producto");
var DetalleVentas = require("./models/detalle-venta");
var Ventas = require("./models/venta");
var Counter = require("./models/counter");
var Role = require("./models/role");
var Permission = require("./models/permission");


//controladores
const router_usuario = require('./controlers/ctr_usuarios');
const router_producto = require('./controlers/ctr_producto');
const router_venta = require('./controlers/ctr_ventas');
const router_cliente = require('./controlers/ctr_cliente');
const router_autho = require('./controlers/ctr_autho');
const router_role = require('./controlers/ctr_role');
const router_permission = require('./controlers/ctr_permission');


const app = express();

// Use native promises -- Nose porque es esto pero ahce que ande
mongoose.Promise = global.Promise;

//para la conexion a mongo db
//mongoose.connect(config.MONGO_PATH);
if (process.env.NODE_ENV == "test") {
        var mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(() => {
                mongoose.connect(config.MONGO_TEST);
                mongoose.connection.on('connected', () => {
                        console.log('db test connection is now open');
                });
        });
} else {
        mongoose.connect(config.MONGO_PATH);
}

//midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(methodOverride());


//routers
app.use("/api", authorization);//midleware para validacion de acceso a la api.
app.use("/api", router_usuario);
app.use("/api", router_producto);
app.use("/api", router_venta);
app.use("/api", router_cliente);
app.use("/api", router_autho);
app.use("/api", router_role);
app.use("/api",router_permission);



app.listen(3000, () => {
        console.log("Server funcionando");
})

module.exports = app; // for test