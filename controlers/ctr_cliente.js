var express = require("express");
var router = express.Router();
var Cliente = require("../models/cliente");
const authorization = require("../midleware/authorization");


//rutas protegidas
router.get("/cliente", authorization);
router.post("/cliente", authorization);
router.get("/cliente/:id", authorization);
router.put("/cliente/:id", authorization);
router.delete("/cliente/:id", authorization);

router.route("/cliente")
    .get((req, res) => {
        Cliente.find((err, client) => {
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

router.route("/cliente/:id")
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