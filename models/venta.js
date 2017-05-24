var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var venta_schema = new Schema({
  nro_venta: Number,
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, 'El campo cliente es obligatorio']
  },
  fecha: {
    type: Date,
    default: Date.now,
    required:[true,'La fecha es obligatoria']
  },
  detalleVenta: [{ type: Schema.Types.ObjectId, ref: "DetalleVenta" }]
});


var Venta = mongoose.model("Venta", venta_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Venta;