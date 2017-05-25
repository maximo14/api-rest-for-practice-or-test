var express = require("express");
var router = express.Router();
var Usuario = require("../models/usuario");
var Service = require("../shared/service");


router.route("/singup")
    .post((req, res) => {
        var user = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        });
        Usuario.findOne({ nombre: user.nombre }, (err, finduser) => {
            if (err) res.status(500).send(err);
            if (finduser == null) {
                user.save((err, user) => {
                    if (err) res.status(500).send(err);
                    else {
                        res.status(200).jsonp({ token: Service.createToken(user) });
                    }
                });
            } else res.status(500).send({
                message: `El usuario ingresado ya existe` });
        });
    });

router.route("/singin")
    .post((req, res) => {
        Usuario.findOne({
            nombre: req.body.nombre,
            password: req.body.password
        },
            (err, user) => {
                if (err) res.status(500).send(err);
                else {
                    if (user != null) {
                        res.status(200).jsonp({ token: Service.createToken(user) });
                    } else res.status(500).send({
                        message: `El nombre o la password del usuario no coinciden con uno existente`  });
                }
            });
    });


module.exports = router;