const { Schema, model, SchemaTypes } = require("mongoose")

const ReserveSchema = new Schema({
    date: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
})

module.exports = model('Reserve', ReserveSchema)