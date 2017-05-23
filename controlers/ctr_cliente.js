var express = require("express");
var router = express.Router();
var Cliente = require("../models/cliente");

router.route("/cliente")
.get()
.post();

router.route("/cliente/:id")
.get()
.put()
.delete();