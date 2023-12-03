let mongoose = require('mongoose')

let Schema = mongoose.Schema

// schema values
const userValues = {
    name: {type: String, required: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
}

// creating schema
let userSchema = new Schema(userValues)

// creating model
let users = mongoose.model('users', userSchema)

module.exports = users