//esta clase representa un documento contador el cual sirve para identificar
//el siguiente numro en un documento.
//mirar modelo venta.js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var Counter = mongoose.model('counter', CounterSchema);
module.exports = Counter;
