var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var permission_schema = new Schema({
    ruta: String,
    acciones: [{ type: String }]
});
var Permission = mongoose.model("Permission", permission_schema);
module.exports = Permission;