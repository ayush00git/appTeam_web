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
        default: "./uploads/default.png" ,
    },
    role: {
        type: String,
        required: true
    },
    imageId: {
        type: String
    },
    linkedInURL: {
        type: String,
        required: true
    },
    githubURL: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true})

const member = model("members", memberSchema)

module.exports = member