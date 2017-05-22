var express = require("express");
var router = express.Router();
var Usuario = require("../models/usuario");

router.route("/usuario")
    .get((req, res) => {
        Usuario.find((err, user) => {
            if (err) console.log("Error en /cliente get");
            else {
                res.status(200).jsonp(user);
            }
        });
    })
    .post((req, res) => {
        var user = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        });
        user.save((err, user) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).jsonp(user);
            }
        });
    });

router.route("/usuario/:id")
    .get((req, res) => {
        Usuario.findById(req.params.id, (err, user) => {
            if (err) console.log("Error en /cliente get");
            else {
                res.status(200).jsonp(user);
            }
        });
    })
    .put((req, res) => {
        Usuario.findById(req.params.id, (err, user) => {
            if (err) console.log("Error en /cliente get");
            else {
                user.nombre = req.body.nombre;
                user.email = req.body.email;
                user.password = req.body.password;
                user.save((err, user) => {
                    if (err) console.log(err);
                    else {
                        res.status(200).jsonp(user);
                    }
                });
            }
        });
    })
    .delete((req, res) => {
        Usuario.findById(req.params.id, (err, user) => {
            user.remove((err, user) => {
                if (err) res.status(500).send(err)
                else {
                    res.status(200).send(user);
                }
            });
        });
    });

module.exports = router;