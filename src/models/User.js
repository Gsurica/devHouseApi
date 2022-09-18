const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    email: String,
})

module.exports = model('User', UserSchema)




