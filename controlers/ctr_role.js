var express = require("express");
var router = express.Router();
var Role = require("../models/role");

router.route("/roles")
    .get((req, res) => {
        Role.find(req.query, (err, roles) => {
            if (err) res.status(500).send(err);
            res.status(200).jsonp(roles);
        });
    })
    .post((req, res) => {
        var role = new Role({
            nombre: req.body.nombre,
            permission: req.body.permission
        });
        role.save((err, role) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).jsonp(role);
            }
        });
    });

router.route("/roles/:id")
    .get((req, res) => {
        Role.findById(req.params.id, (err, role) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).jsonp(role);
            }
        });
    })
    .put((req, res) => {
        Role.findById(req.params.id, (err, role) => {
            if (err) res.status(500).send(err);
            else {
                role.nombre = req.body.nombre;
                role.permission = req.body.permission;               
                role.save((err, role) => {
                    if (err) console.log(err);
                    else {
                        res.status(200).jsonp(role);
                    }
                });
            }
        });
    })
    .delete((req, res) => {
        Role.findById(req.params.id, (err, role) => {
            role.remove((err, role) => {
                if (err) res.status(500).send(err)
                else {
                    res.status(200).send(role);
                }
            });
        });
    });

module.exports = router;