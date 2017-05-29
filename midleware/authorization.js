var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

module.exports = (req, res, next) => {
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


    if (payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({ message: "El token ha expirado" });
    }

    req.user = payload.sub;
    next();
}