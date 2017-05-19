var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var detalle_venta_schema = new Schema({
  nro: Number,
  producto: Schema.Types.ObjectId
});


var Detalle_Venta = mongoose.model("DetalleVenta",detalle_venta_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports.DetalleVenta = Detalle_Venta;