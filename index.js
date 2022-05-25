'use strict' //Para poder utilizar ecmascript 6

const mongoose = require('mongoose') //We gain access to mongodb functions
const app = require('./app')

const config = require('./config')


//Conexion a la base de datos
mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`error al conectar a la base de datos: ${err}`)
    } 

    console.log('Conexion a la base de datos establecida.') //Esto se muestra por consola

    //Levantamos el servidor/inicializamos express
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
})




