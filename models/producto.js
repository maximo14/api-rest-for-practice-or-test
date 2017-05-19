var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var producto_schema = new Schema({
    nombre: String,
    marca: String,
    precio: Number
});


var Producto = mongoose.model("Producto", producto_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports.Producto = Producto;