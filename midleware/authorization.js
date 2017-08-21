var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
var Usuario = require("../models/usuario");
var Role = require("../models/role");
var Permission = require("../models/permission");

module.exports = (req, res, next) => {
    if ((req.baseUrl + req.path) == '/api/singin' || (req.baseUrl + req.path) == '/api/singup') {
        return next()
    }
    if (!req.headers.authorization) {
        return res
            .status(401)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    var token = req.headers.authorization;
    try {
        var payload = jwt.decode(token, config.TOKEN_SECRET);
    } catch (e) {
        return res
            .status(401)
            .jsonp({ message: "El token enviado no es un token valido" });
    }

    Usuario.findById({ _id: payload.sub })
        .populate({ path: "role", populate: { path: "permission" } })
        .exec((err, user) => {
            if (err) console.log("error en buscar usario validacion permisos");
            if (user != null && user.role != null) {
                let permiso_ruta = false;//para almacenar si tiene permiso para entrar a la ruta
                let tieneAccion = false;//bandera para ver si tiene permiso para realizar esa accion                
                for (per of user.role.permission) {
                    if (validatePath(req, per)) {
                        if (!permiso_ruta) {
                            permiso_ruta = true
                        }
                        if (per.acciones.indexOf(req.method) != -1) {
                            tieneAccion = true;
                            break;
                        }
                    }
                }//fin for               
                if (permiso_ruta && tieneAccion) {                    
                    return next();
                }
                if (!permiso_ruta) {
                    return res
                        .status(401)
                        .send({ message: `No tienes permiso para acceder a la ruta ${req.baseUrl}${req.path}` });

                }
                if (!tieneAccion) {
                    return res
                        .status(401)
                        .send({ message: "No tienes permisos para realizar esta acccion: " + req.method });
                }
            } else {
                return res
                    .status(401)
                    .send({ message: "El usuario no es valido" });
            }
        });
}

//valida si tiene permisos para acceder a esa ruta
function validatePath(req, permiso) {
    var aPermRuta = permiso.ruta.split("/");
    var aReqRuta = (req.baseUrl + req.path).split("/");   
    var band = true;
    for (let i = 0; i < aReqRuta.length; i++) {      
        if (aPermRuta[i] != aReqRuta[i]) {
            if (aPermRuta[i] != ":id") {            
                band = false;
                break;
            }
        }
    }
    return band;
}