var express = require("express");
var router = express.Router();
var Producto = require("../models/producto");

//se le agrego filtros a los productos
router.route("/productos")
    .get((req, res) => {       
        Producto.find(req.query,(err, prod) => {
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
            foto: req.body.foto
        });
        producto.save((err, prod) => {
            if (err) res.status(500).send(err);
            else {
                res.status(200).jsonp(prod);
            }
        });
    });

router.route("/productos/:id")
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
            precio: req.body.precio,
            foto: req.body.foto
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