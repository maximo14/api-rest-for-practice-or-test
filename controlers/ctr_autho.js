var express = require("express");
var router = express.Router();
var Usuario = require("../models/usuario");
var Service = require("../shared/service");


router.route("/singup")//registar
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
                error: `El usuario ingresado ya existe` });
        });
    });

router.route("/singin")//loguiar
    .post((req, res) => {
        Usuario.findOne({
            nombre: req.body.nombre            
        },
            (err, user) => {
                if (err) res.status(500).send(err);
                else {
                    if (user != null) {
                        user.comparePassword(req.body.password,(err,isMatch)=>{
                             if (err) res.status(500).send(err);
                             else{                               
                                 if(isMatch == true) res.status(200).jsonp({ token: Service.createToken(user) });
                                 else res.status(500).send({
                                error: `El nombre o la password del usuario no coinciden con uno existente`});
                             }
                        });                      
                    } else res.status(500).send({
                        error: `El nombre o la password del usuario no coinciden con uno existente`  });
                }
            });
    });


module.exports = router;