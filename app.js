'use strict' //Para poder utilizar ecmascript 6

const express = require('express')
const bodyParser = require('body-parser'); //Funciona como middlewares
const hbs = require('express-handlebars') //Motor de plantilla en express
const app = express()
const api = require('./routes/index')

//Añadimos middlewares 
app.use(bodyParser.urlencoded( {extended: false} )) 
app.use(bodyParser.json()) //Poder admitir peticiones con cuerpo de mensaje en formato json

//Configuracion del motor de plantillas que utilizaremos para node
app.engine('.hbs', hbs.engine({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')


app.use('/api', api) //Definimos que para '/api' se carguen las apis
app.get('/login', (req, res) => {
    res.render('login')
}) //Definimos que para '/login' renderizaremos nuestras vistas
app.get('/product', (req, res) => {
    res.render('product')
})

module.exports = app