var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rol_schema = new Schema({    
    nombre:{type: String, enum:["Admin","Client"], require: [true,'El nombre del rol tiene que ser Admin o Client']},
    descripcion: String
    permisos: [{type: Schema.Types.ObjectId}, ref:'Permisos']
});

var Rol = mongoose.model("Rol", rol_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Rol;