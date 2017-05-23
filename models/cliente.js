var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cliente_schema = new Schema({
    nombre: String,
    apellido:String,
    dni: Number,
    email: String,
    usuario:{type: Schema.Types.ObjectId, ref:"Usuario"}
});



var Usuario = mongoose.model("Cliente",cliente_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Usuario;