const mongoose = require("mongoose");
const Usuario = require("../models/usuario");
const Role = require("../models/role");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')
const service = require("../shared/service");
const should = chai.should();
const assert = chai.assert;
const setUpPerYRol = require("./test_helper").setUpPermisisYroles
const obtenerTokenRol = require("./test_helper").obtenerTokenParaRol
const ROLES = require("./test_helper").ROLES

describe("Auntentication", () => {
    before((done) => {
        setUpPerYRol(() => {
            done();
        });
    });

    beforeEach((done) => {
        Usuario.remove({}, (err) => {
            done();
        });
    });
    ROLES

    describe("SignIn", (done) => {
        it("Loguair usuario existente, pasa", (done) => {
            Role.find({ nombre: ROLES.NormUser }, (err, rol) => {
                log = {
                    nombre: "maximo25",
                    password: "1234",
                    email: "googo@gmail.com",
                    role: rol[0]._id
                }
                user = new Usuario(log);
                user.save((err, user) => {
                    chai.request(server)
                        .post('/api/singin')
                        .send({ nombre: log.nombre, password: log.password })
                        .end((err, res) => {
                            assert.isObject(res.body, "Tiene que devolver un objeto");
                            assert.equal(res.status, 200, "El estatus tiene que ser 200")
                            res.body.should.have.property("token");
                            done();
                        });
                });
            });

        });//Fin it

        it("Loguair usuario No Existente, no pasa", (done) => {
            log = { nombre: "eutanacio", password: "45854" }
            chai.request(server)
                .post('/api/singin')
                .send({ nombre: log.nombre, password: log.password })
                .end((err, res) => {
                    assert.isObject(res.body, "Tiene que devolver un objeto");
                    assert.equal(res.status, 500, "El estatus tiene que ser 500")
                    res.body.should.have.property("error");
                    done();
                });
        });//fin it
    });//Fin de SingIn


    describe("SingUp", (done) => {
        it("Se registra el usuario correctamente", (done) => {
            log = { nombre: "eutanacio", password: "45854", email: "etu14@gmail.com" }
            chai.request(server)
                .post('/api/singup')
                .send({ nombre: log.nombre, password: log.password, email: log.email })
                .end((err, res) => {
                    assert.isObject(res.body, "Tiene que devolver un objeto");
                    assert.equal(res.status, 200, "El estatus tiene que ser 200")
                    res.body.should.have.property("token");
                    done();
                });
        });//fin it

        it("Falla al registrar el usuario porque ya existe", (done) => {
            log = {
                nombre: "maximo25",
                password: "1234",
                email: "googo@gmail.com"
            }
            user = new Usuario(log);
            user.save((err, user) => {
                chai.request(server)
                    .post('/api/singup')
                    .send({ nombre: log.nombre, password: log.password })
                    .end((err, res) => {
                        assert.isObject(res.body, "Tiene que devolver un objeto");
                        assert.equal(res.status, 500, "El estatus tiene que ser 500")
                        res.body.should.have.property("error");
                        done();
                    });
            });
        });//fin it

    });//fin de singup



});//Fin de caso de prueba