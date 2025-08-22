const { Schema, model } = require("mongoose")

const contactSchema = new Schema({
    name: {
        type: String,
        required: true        
    },
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    }
}, {timestamps: true})

const contact = model('contacts', contactSchema)

module.exports = contact