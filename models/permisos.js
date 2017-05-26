var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var permiso_schema = new Schema({    
    ruta_acceso: {type: String, require:[true, "La ruta del permiso es requerida"]}
    accion:{type: String , enum:["GET","POST","PUT","DELETE"]}
});

var Permiso = mongoose.model("Permiso", permiso_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Permiso;