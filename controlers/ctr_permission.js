var express = require("express");
var router = express.Router();
var Permission = require("../models/permission");

router.route("/permissions")
    .get((req, res) => {        
        Permission.find(req.query, (err, permissions) => {          
            if (err) res.status(500).send(err);           
            res.status(200).jsonp(permissions);
        });
    })
    .post((req, res) => {
        var permission = new Permission({
            ruta: req.body.ruta,
            acciones: req.body.acciones
        });     
        permission.save((err, permission) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).jsonp(permission);
            }
        });
    });

router.route("/permissions/:id")
    .get((req, res) => {
        Permission.findById(req.params.id, (err, permission) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).jsonp(permission);
            }
        });
    })
    .put((req, res) => {
        Permission.findById(req.params.id, (err, permission) => {
            if (err) res.status(500).send(err);
            else {
                permission.ruta = req.body.ruta;
                permission.acciones = req.body.acciones;               
                permission.save((err, permission) => {
                    if (err) console.log(err);
                    else {
                        res.status(200).jsonp(permission);
                    }
                });
            }
        });
    })
    .delete((req, res) => {
        Permission.findById(req.params.id, (err, permission) => {
            permission.remove((err, permission) => {
                if (err) res.status(500).send(err)
                else {
                    res.status(200).send(permission);
                }
            });
        });
    });

module.exports = router;