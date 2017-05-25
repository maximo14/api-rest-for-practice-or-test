var express = require("express");
var router = express.Router();
var Producto = require("../models/producto");
const authorization = require("../midleware/authorization");

//rutas protegidas 
router.post("/producto", authorization);
router.put("/producto/:id", authorization);
router.delete("/producto/:id", authorization);


router.route("/producto")
    .get((req, res) => {
        Producto.find((err, prod) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).json(prod);
            }
        });
    })
    .post((req, res) => {
        var producto = new Producto({
            nombre: req.body.nombre,
            marca: req.body.marca,
            precio: req.body.precio,
        });
        producto.save((err, prod) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).jsonp(prod);
            }
        });
    });

router.route("/producto/:id")
    .get((req, res) => {
        Producto.findById(req.params.id, (err, prod) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).json(prod);
            }
        });
    })
    .put((req, res) => {
        Producto.findByIdAndUpdate({ _id: req.params.id }, {
            nombre: req.body.nombre,
            marca: req.body.marca,
            precio: req.body.precio
        }, (err, prod) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).json(prod);
            }
        });
    })
    .delete((req, res) => {
        Producto.findOneAndRemove({ _id: req.params.id }, (err, prod) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).json(prod);
            }
        });
    });

module.exports = router;