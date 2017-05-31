const mongoose = require("mongoose");
const producto = require("../models/producto");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app')
const service = require("../shared/service");
const should = chai.should();

chai.use(chaiHttp);

//usuario para token
let token = service.createToken({ _id: "59287e64f4c4801fb49dac61" });


//Our parent block
describe('Productos', () => {
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
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    describe("/POST Productos", () => {
        it('Falla al insertar un producto, no tiene token de autenticacion', (done) => {
            let product = {
                nombre: 'Vaso',
                marca: 'Los mejores vidrios',
                precio: 30
            }
            chai.request(server)
                .post("/api/productos")
                .send(product)
                .end((req, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it('Inserta un producto correctamente, cuenta con token y no es administrador', (done) => {
            let product = {
                nombre: 'Vaso',
                marca: 'Los mejores vidrios',
                precio: 30
            }

            chai.request(server)
                .post("/api/productos")
                .set({ authorization: "dasda" })//revisar para que no sea admin despues
                .send(product)
                .end((req, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it('Inserta un producto correctamente, cuenta con token y es administrador', (done) => {
            let product = {
                nombre: 'Vaso',
                marca: 'Los mejores vidrios',
                precio: 30
            }

            chai.request(server)
                .post("/api/productos")
                .set({
                    "authorization": token
                })
                .send(product)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("nombre");
                    res.body.should.have.property("marca");
                    res.body.should.have.property("precio");
                    done();
                });
        });

    });


    describe('/GET:id Productos', () => {
        it('Busca solo un producto correctamente', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285 });
            product.save((err, pro) => {
                chai.request(server)
                    .get('/api/productos/' + pro._id)
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

    describe('/PUT:id Productos', () => {
        it('Actualiza un producto correctamente, tiene token y es administrador', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285 });
            product.save((err, pro) => {
                chai.request(server)
                    .put('/api/productos/' + pro._id)
                    .set({ authorization: token })
                    .send({ nombre: 'kimera', marca: 'alquimista', precio: 500 })
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

    describe('/DELETE:id Productos', () => {
        it('Elimina un producto correctamente, tiene token y es administrador', (done) => {
            let product = new producto({ nombre: "celular", marca: 'samsung', precio: 285 });
            product.save((err, pro) => {
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

});

