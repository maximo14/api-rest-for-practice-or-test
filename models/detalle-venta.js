var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var detalle_venta_schema = new Schema({
  cant: {
    type: Number,
    required: [true, 'La cantidad del producto es obligatoria'],
    min: [1,'La cantidad minima de un producto es 1']
  },
  producto: {
    type: Schema.Types.ObjectId, 
    ref: "Producto",
     required: [true, 'El campo producto es obligatorio'] }
});


var Detalle_Venta = mongoose.model("DetalleVenta", detalle_venta_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Detalle_Venta;