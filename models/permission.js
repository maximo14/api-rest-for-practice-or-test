var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var permission_schema = new Schema({
    ruta: {type: String, required: true},
    acciones: [{ type: String, enum:["GET","POST","PUT","DELETE"], required: true}]
});
var Permission = mongoose.model("Permission", permission_schema);
module.exports = Permission;