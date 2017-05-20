//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const scriptBD = require("./BDScript/bdScript");


const app = express();


        //para la conexion a mongo db
mongoose.connect("mongodb://localhost/tienda_productos");

// Use native promises -- Nose porque es esto pero ahce que ande
mongoose.Promise = global.Promise;
        // fin de mongo db

scriptBD();

//midleware
//funcion del body parser para el manejo de JSON
app.use(bodyParser.json());

//hago que express use body-parser para poder acceder a los elementos del html
app.use(bodyParser.urlencoded({ extended: true}));



app.listen(3000,()=>{
    console.log("Server funcionando");
} )