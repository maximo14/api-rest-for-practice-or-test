var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var venta_schema = new Schema({
  nro_venta: Number,
  cliente: Schema.Types.ObjectId,
  fecha: {type: Date, default: Date.now},
  detalleVenta: [Schema.type.ObjectId]
});


var Venta = mongoose.model("Venta",venta_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports.Venta = Venta;