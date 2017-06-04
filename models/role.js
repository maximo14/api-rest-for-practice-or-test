var mongoose= require("mongoose");
var Schema = mongoose.Schema;

var role_schema = new Schema({
    nombre: String,
    permission: [{ type: Schema.Types.ObjectId, ref:"Permission" }]
});
var Role= mongoose.model("Role", role_schema);
module.exports = Role;