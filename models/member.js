const { Schema, model } = require("mongoose")

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    linkedInURL: {
        type: String,
        required: true
    },
    githubURL: {
        type: String,
        required: true
    } 
})

const member = model("members", memberSchema)

module.exports = member