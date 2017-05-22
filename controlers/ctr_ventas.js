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
                res.status(200).send(venta);
            });
    })
    .post();

router.route("/venta/:id")
    .get()
    .put()
    .delete();