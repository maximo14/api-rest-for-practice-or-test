var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt =require("bcrypt");
var SALT_WORK_FACTOR = 10;

var usuario_schema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del usuario es obligatoria"]
    },
    email: {
        type: String,
        required: [true, 'La direccion de email es obligatoria']
    },
    password: {
        type: String,
        required:[true, 'La contraseña es obligatoria']
    },
});

//para encriptar la conseña cuando se guarda
usuario_schema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
//para comparar los password
usuario_schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


var Usuario = mongoose.model("Usuario", usuario_schema);

//exporto el modulo para que pueda ser accesido desde cualquier parte
module.exports = Usuario;