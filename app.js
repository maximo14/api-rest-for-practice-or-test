//imports
const express = require("express");
const bodyParser = require("body-parser");

const app = express();



//midleware
//funcion del body parser para el manejo de JSON
app.use(bodyParser.json());

//hago que express use body-parser para poder acceder a los elementos del html
app.use(bodyParser.urlencoded({ extended: true}));



app.listen(3000,()=>{
    console.log("Server funcionando");
} )