const mongoose = require("mongoose");
const producto = require("../models/producto");
const chai = require('chai');
const chaiHttp = require('chai-http');
let server = require('../app');//revisar
const should = chai.should();

chai.use(chaiHttp);

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


    describe("/POST Producto", () => {
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

    });

});

