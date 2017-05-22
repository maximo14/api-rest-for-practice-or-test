var express = require("express");
var router = express.Router();
var Venta = require("../models/venta");
var DetalleVenta = require("../models/detalle-venta");

router.route("/venta")
    .get((req, res) => {
        Venta.find()
            .populate('cliente')
            .populate({ path: 'detalleVenta', populate: { path: 'producto' } })
            .exec((err, venta) => {
                res.status(200).jsonp(venta);
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

router.route("/venta/:id")
    .get((req, res) => {
        Venta.findById(req.params.id)
            .populate('cliente')
            .populate({ path: 'detalleVenta', populate: { path: 'producto' } })
            .exec((err, venta) => {
                if (err) res.status(500).send(err.mensaje);
                else res.status(200).jsonp(venta);
            });
    })
    .put()
    .delete((req, res) => {
        Venta.findByIdAndRemove(req.params.id,(err,venta)=>{
            if(err) res.status(500).send(err)
            else res.status(200).jsonp(venta);
        });
    });

module.exports = router;