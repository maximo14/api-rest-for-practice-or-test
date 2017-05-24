var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuario_schema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del usuario es obligatoria"]
    },
    email: {
        type: String,
        required: [true, 'La direccion de email es obligatoria']
    },
    password: {
        type: String,
        required:[true, 'La contraseña es obligatoria']
    }
});



var Usuario = mongoose.model("Usuario", usuario_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Usuario;