var express = require("express");
var router = express.Router();
var Cliente = require("../models/cliente");

router.route("/cliente")
    .get((req, res) => {
        Cliente.find((err, client) => {
            if (err) res.status(500).send(err);
            else res.status(200).jsonp(client);
        });
    })
    .post();

router.route("/cliente/:id")
    .get((req, res) => {
        Cliente.findById(req.params.id, (err, client) => {
            if (err) res.status(500).send(err);
            else res.status(200).jsonp(client);
        })
    })
    .put()
    .delete();

module.exports = router;