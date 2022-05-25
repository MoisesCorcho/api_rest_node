'use strict'
 
const service = require('../services/index')

function isAuth (req, res, next) {

    //comprueba si existe autorizacion
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'No tienes autorización'})
    }

    const token = req.headers.authorization.split(' ')[1]

    service.decodeToken(token)
        .then(response => {
            //Estamos inyectando la propiedad user a req a la cual le asignamos la propiedad sub del payload la cual es el id que nos genera mongo
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })

}

module.exports = isAuth