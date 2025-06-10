const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
}, {timestamps: true})

const user = model("users", userSchema)
module.exports = user