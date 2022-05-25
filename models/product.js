'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//We create our product Schema
const ProductSchema = Schema({
    name: String,
    picture: String,
    price: {type: Number, default: 0},
    category: {type: String, enum: ['computers', 'phones', 'accesories']}, //in this way, the atribute category just can receive one of those that we defined
    description: String
})

//We export our Schema, the first argument is the schema name
module.exports = mongoose.model('Product', ProductSchema)