const express = require("express");
require("dotenv").config();
const cors = require('cors');
const { dbConnection } = require("./database/config");


//Crear Servidor
app = express();

//Base de datos
dbConnection()

//CORS

app.use(cors())

//Directorio publico
app.use(express.static("public"))

//Lectura y parseo de body
app.use(express.json());

//Rutas
//Auth
app.use("/api/auth", require("./routes/auth"))
//Loads
app.use("/api/loads", require("./routes/loadEvents"))



//Escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})