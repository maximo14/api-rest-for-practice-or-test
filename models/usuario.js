var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//se pueden agregar validaciones a los equemas.. ver doc Mongoose validation
//se puede usar las que vienen con moonguse o hacer validaciones personalizadas
var user_schema = new Schema({
    username: String,
    email: String,
    password: String
});

//forma de represtar aquellos atributos que no se van a guardar en la BD, pero son
//utiles tenerlos
user_schema.virtual("password_confirmation").get(()=> {
    return this.password_confirmation;
}).set((passwordrepit)=>{
    this.password_confirmation = passwordrepit;
});

var User = mongoose.model("User",user_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports.User = User;