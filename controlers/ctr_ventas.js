var express = require("express");
var router = express.Router();
var Venta = require("../models/venta");
var DetalleVenta = require("../models/detalle-venta");

router.route("/ventas")
    .get((req, res) => {
        Venta.find(req.query)
            .populate('cliente')
            .populate({ path: 'detalleVenta', populate: { path: 'producto' } })
            .exec((err, venta) => {
                try {
                    if (err) res.status(500).send(err);
                    res.status(200).jsonp(venta);
                }
                catch (e) {
                    console.log("cabeza rescribida");
                }
            });
    })
    .post((req, res) => {
        DetalleVenta.insertMany(req.body.detalleVenta, (err, detalles) => {
            if (err) res.status(500).send(err);
            else {
                let detallesId = [];
                for (det of detalles) {
                    detallesId.push(det._id);
                }
                let venta = new Venta({
                    cliente: req.body.cliente,
                    detalleVenta: detallesId
                });
                venta.save((err, venta) => {
                    if (err) res.status(500).send(err);
                    else {
                        res.status(200).jsonp(venta);
                    }
                });
            }
        });
    });

router.route("/ventas/:id")
    .get((req, res) => {
        Venta.findById(req.params.id)
            .populate('cliente')
            .populate({ path: 'detalleVenta', populate: { path: 'producto' } })
            .exec((err, venta) => {
                if (err) res.status(500).send(err.mensaje);
                else res.status(200).jsonp(venta);
            });
    })
    .put((req, res) => {
        Venta.findByIdAndUpdate({ _id: req.body._id }, {
            cliente: req.body.cliente
        }, (err, venta) => {
            if (err) res.status(500).send(err);
            else {
                let detalles = req.body.detalleVenta
                for (det of detalles) {
                    DetalleVenta.findByIdAndUpdate({ _id: det._id }, {
                        cant: det.cant,
                        producto: det.producto
                    }, (err) => {
                        if (err) res.status(500).send(err);
                    });
                }
                res.status(200).jsonp(venta);
            }//fin else
        });
    })
    .delete((req, res) => {
        Venta.findByIdAndRemove(req.params.id, (err, venta) => {
            if (err) res.status(500).send(err)
            else {
                for (det of venta.detalleVenta) {
                    DetalleVenta.findByIdAndRemove({ _id: det }, (err, detalle) => {
                        if (err) res.status(500).send(err);
                    })
                }
                res.status(200).jsonp(venta);
            }
        });
    });

module.exports = router;