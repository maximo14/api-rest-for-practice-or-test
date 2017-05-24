var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cliente_schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del cliente es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido del cliente es requerido']
    },
    dni: {
        type: Number,
        required: [true, 'El dni del cliente es requerido']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, 'El id del usuario es requerido']
    }
});



var Usuario = mongoose.model("Cliente", cliente_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Usuario;