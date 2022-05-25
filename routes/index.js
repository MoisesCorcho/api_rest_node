'use strict'

const express = require('express')
const api = express.Router()
const ProductController = require('../Controllers/product')
const UserController = require('../Controllers/user')
const auth = require('../middlewares/auth') //requerimos los middleware

api.get('/products', ProductController.getProducts)
api.get('/product/:productId', ProductController.getProduct)
api.post('/product', auth, ProductController.storeProduct)
api.put('/product/:productId', auth, ProductController.updateProduct)
api.delete('/product/:productId', auth, ProductController.deleteProduct)

api.post('/signUp', UserController.signUp)
api.post('/signIn', UserController.signIn)

api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso '})
})

module.exports = api 