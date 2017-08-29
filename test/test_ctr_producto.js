const mongoose = require("mongoose");
const producto = require("../models/producto");
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

chai.use(chaiHttp);

//Our parent block
describe('Productos', () => {
    before((done) => {
        setUpPerYRol(() => {
            done();
        });
    });
    beforeEach((done) => { //Before each test we empty the database
        producto.remove({}, (err) => {
            done();
        });
    });

    /*
      * Test the /GET route
      */
    describe('/GET Producto', () => {
        it('Muestra todos los productos', (done) => {
            chai.request(server)
                .get('/api/productos')
                .end((err, res) => {
                    assert.isArray(res.body, "La consulta tiene que devolver un arreglo")
                    assert.equal(res.status, 200, "El estatus tiene que ser 200")
                    assert.equal(res.body.length, 0, "La cantidad de productos debe ser 0 ")
                    done();
                });
        });
    });//fin /Get Producto


    describe("/POST Productos", () => {
        it('Falla al insertar un producto, no tiene token de autenticacion', (done) => {
            let product = {
                nombre: 'Vaso',
                marca: 'Los mejores vidrios',
                precio: 30,
                foto: ""
            }
            chai.request(server)
                .post("/api/productos")
                .send(product)
                .end((req, res) => {
                    assert.equal(res.status, 401, "El estatus tiene que ser 401")
                    done();
                });
        });

        it('Falla al insertar un producto, cuenta con token y no es administrador', (done) => {
            obtenerTokenRol(ROLES.NormUser, (token) => {
                let product = {
                    nombre: 'Vaso',
                    marca: 'Los mejores vidrios',
                    precio: 30
                }
                chai.request(server)
                    .post("/api/productos")
                    .set({ authorization: token })//revisar para que no sea admin despues
                    .send(product)
                    .end((req, res) => {
                        assert.equal(res.status, 403, "El estatus tiene que ser 403")
                        assert.isObject(res.body, "El cuerpo de la respuesta tiene que ser un objeto")
                        res.body.should.have.property("error");
                        done();
                    });
            });

        });

        it('Inserta un producto correctamente, cuenta con token y es administrador', (done) => {
            obtenerTokenRol("Admin", (token) => {
                let product = {
                    nombre: 'Vaso',
                    marca: 'Los mejores vidrios',
                    precio: 30,
                    foto: " "
                }
                chai.request(server)
                    .post("/api/productos")
                    .set({ 'authorization': token })
                    .send(product)
                    .end((req, res) => {
                        assert.equal(res.status, 200, "El status code tiene que ser 200")
                        assert.isObject(res.body, "El cuerpo de la respuesta tiene que ser un objeto")
                        assert.equal(res.body.nombre, product.nombre, "Los nombres tienen que coincidir")
                        assert.equal(res.body.marca, product.marca, "Las marcas tienen que coincidir")
                        assert.equal(res.body.precio, product.precio, "Los precios tienen que coincidir")
                        assert.equal(res.body.foto, product.foto, "Las fotos tienen que coincidir")
                        done();
                    });
            })
        });

    });//Fin /POST producto


    describe('/GET:id Productos', () => {
        it('Falla al busca solo un producto, no es administrador, ni encargado de producto', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285, foto: " " });
            product.save((err, pro) => {
                obtenerTokenRol(ROLES.NormUser, (token) => {
                    chai.request(server)
                        .get('/api/productos/' + pro._id)
                        .set({ 'authorization': token })
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('Object');
                            res.body.should.have.property("error");
                            done();
                        });
                });
            });
        });

        it('Busca solo un producto y lo encuentra, no es administrador, ni encargado de producto', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285, foto: " " });
            product.save((err, pro) => {
                obtenerTokenRol(ROLES.EncProdu, (token) => {
                    chai.request(server)
                        .get('/api/productos/' + pro._id)
                        .set({ 'authorization': token })
                        .end((err, res) => {
                            res.should.have.status(200);
                            assert.isObject(res.body, "Tiene que devolver un objeto");
                            assert.equal(res.body.nombre, product.nombre, "Los nombres no coinciden");
                            assert.equal(res.body.marca, product.marca, "La marca no coinciden");
                            assert.equal(res.body.precio, product.precio, "Los precios no coinciden");
                            assert.equal(res.body.foto, product.foto, "La foto no coinciden");
                            done();
                        });
                });
            });
        });
    });//Fin /GET:id Producto

    describe('/PUT:id Productos', () => {
        it('Falla al actualiza un producto, tiene token y no es administrador ni encargado de productos', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285, foto: " " });
            let newProduct = {
                nombre: 'kimera',
                marca: 'alquimista',
                precio: 500,
                foto: "GG mamu"
            }
            product.save((err, pro) => {
                obtenerTokenRol(ROLES.NormUser, (token) => {
                    chai.request(server)
                        .put('/api/productos/' + pro._id)
                        .set({ authorization: token })
                        .send(newProduct)
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('Object');
                            res.body.should.have.property("error");
                            done();
                        });
                });
            });
        });

        it('Actualiza un producto, tiene token y es Administrador', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285 });
            let newProduct = {
                nombre: 'kimera',
                marca: 'alquimista',
                precio: 500,
                foto: "GG mamu"
            }
            product.save((err, pro) => {
                obtenerTokenRol(ROLES.Admin, (token) => {
                    chai.request(server)
                        .put('/api/productos/' + pro._id)
                        .set({ authorization: token })
                        .send(newProduct)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('Object');
                            assert.equal(res.body.nombre, product.nombre, "Tiene que coincidir con el nombre antiguo del producto");
                            assert.equal(res.body.marca, product.marca, "Tiene que coincidir con la marca antigua del producto");
                            assert.equal(res.body.precio, product.precio, "Tiene que coincidir con el precio antiguo del producto");
                            assert.equal(res.body.foto, product.foto, "Tiene que coincidir con la foto antigua del producto");
                            done();
                        });
                });
            });
        });
    });//fIN /PUT:id Producto

    describe('/DELETE:id Productos', () => {
        it('Elimina un producto correctamente, tiene token y es administrador', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285 });
            product.save((err, pro) => {
                obtenerTokenRol(ROLES.Admin, (token) => {
                    chai.request(server)
                        .del('/api/productos/' + pro._id)
                        .set({ authorization: token })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('Object');
                            res.body.should.have.property("_id").eql('' + pro._id);
                            res.body.should.have.property("nombre").eql(pro.nombre);
                            res.body.should.have.property("marca").eql(pro.marca);
                            res.body.should.have.property("precio").eql(pro.precio);
                            done();
                        });
                });
            });
        });


        it('Falla a eliminar un producto correctamente, tiene token y no es administrador ni encargado de producto', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285 });
            product.save((err, pro) => {
                obtenerTokenRol(ROLES.NormUser, (token) => {
                    chai.request(server)
                        .del('/api/productos/' + pro._id)
                        .set({ authorization: token })
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('Object');
                            res.body.should.have.property("error");                          
                            done();
                        });
                });
            });
        });
    });//Fin /DELETE:id Producto

});//Fin test producto

