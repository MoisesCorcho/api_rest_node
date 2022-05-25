'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
    //Creamos un objeto payload, que lleva informacion basica/necesaria entre cliente y servidor
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN) //obtenemos el objeto payload ya decodificado que nos envia el usuario desde el cliente desde el token que se envia en la cabecera

            //Verificamos que el token no haya expirado
            if (payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    mesage: 'El token ha expirado'
                })
            }

            resolve(payload.sub)

        }catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken 
}