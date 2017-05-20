var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuario_schema = new Schema({
    nombre: String,
    email: String,
    password: String
});



var Usuario = mongoose.model("Usuario",usuario_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Usuario;