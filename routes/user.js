const express = require("express")
const router = express.Router()
const user = require("../models/user")

router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body
    await user.create({
        name, 
        email,
        password
    })
    return res.redirect('/')
})


module.exports = router