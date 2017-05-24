var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var producto_schema = new Schema({
    nombre: {
        type: String,
        required:[true,'El nombre del producto es obligatorio']
    },
    marca: String,
    precio: {
        type: Number,
        required:[true,'El campo precio es obligatorio'],
        min:[0,'El valor minimo de un producto es de $0']
    }
});


var Producto = mongoose.model("Producto", producto_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Producto;