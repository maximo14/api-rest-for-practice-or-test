var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var detalle_venta_schema = new Schema({
  nro: Number,
  producto: {type: Schema.Types.ObjectId , ref: "Producto" }
});


var Detalle_Venta = mongoose.model("DetalleVenta",detalle_venta_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Detalle_Venta;