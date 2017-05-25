//how use: in shell mongo < dbDelete.js
use tienda_productos
db.productos.drop()
db.detalleventas.drop()
db.clientes.drop()
db.ventas.drop()
db.usuarios.drop()
db.counters.drop()

show collections