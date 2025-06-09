const { Schema, model } = require("mongoose")
const { randomBytes, createHmac} = require("crypto")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type: String,
        required: true
    },
    salt:{
        type: String
    }
    
}, {timestamps: true})



userSchema.pre("save", function(next) {
    const user = this

    if(!user.isModified("password")){return}

    const salt = randomBytes(16).toString()
    
    const hashedPassword = createHmac("sha-256", salt).update(user.password).digest("hex")

    this.password = hashedPassword
    this.salt = salt

    next()
})

const user = model("users", userSchema)
module.exports = user