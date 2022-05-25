'use strict'

const mongoose = require('mongoose') //We require the mongoose module
const Schema = mongoose.Schema //We assign to Schema const the Schema property of mongoose
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')


//We create our Schema and then we assign to UserSchema const
const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password: {type: String, select: false}, //We set select to false so that when the user asks for info, the password dont will be send 
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
})

//Preguardamos la contraseña en la base de datos
//Si colocamos una arrow function aqui no va a funcionar porque cambia el scope
UserSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function () {
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)