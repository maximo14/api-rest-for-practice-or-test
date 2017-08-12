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

setTimeout(()=>{



    
},3000)