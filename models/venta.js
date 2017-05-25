var mongoose = require("mongoose");
var Counter = require("../models/counter");
var Schema = mongoose.Schema;


var venta_schema = new Schema({
  nro_venta:Number,
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, 'El campo cliente es obligatorio']
  },
  fecha: {
    type: Date,
    default: Date.now,
    required: [true, 'La fecha es obligatoria']
  },
  detalleVenta: [{ type: Schema.Types.ObjectId, ref: "DetalleVenta" }]
});

//para realizar el auto incremento en nro_venta
venta_schema.pre('save', function(next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'ventas'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.nro_venta = counter.seq;
        next();
    });
});
//para realizar el auto incremento en nro_venta

var Venta = mongoose.model("Venta", venta_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Venta;