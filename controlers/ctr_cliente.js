var express = require("express");
var router = express.Router();
var Cliente = require("../models/cliente");

router.route("/clientes")
    .get((req, res) => {
        Cliente.find(req.query,(err, client) => {
            if (err) res.status(500).send(err);
            else res.status(200).jsonp(client);
        });
    })
    .post((req, res) => {
        var cliente = new Cliente({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            usuario: req.body.usuario
        });
        cliente.save((err, client) => {
            if (err) res.status(500).send(err);
            else res.status(200).jsonp(client);
        });
    });

router.route("/clientes/:id")
    .get((req, res) => {
        Cliente.findById(req.params.id, (err, client) => {
            if (err) res.status(500).send(err);
            else res.status(200).jsonp(client);
        })
    })
    .put((req, res) => {
        Cliente.findOneAndUpdate({ _id: req.params.id }, {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            usuario: req.body.usuario 
        }, (err, cliente) => {
            if (err) res.status(500).send(err);
            else res.status(200).jsonp(cliente);
        });
    })
    .delete((req, res) => {
        Cliente.findByIdAndRemove(req.params.id, (err, client) => {
            if (err) res.status(500).send(err);
            else res.status(200).jsonp(client);
        });
    });

module.exports = router;