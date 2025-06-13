const express = require("express")
const router = express.Router()
const contact = require('../models/contact')

router.get('/', (req, res) => {
    return res.render("home")
})

router.get('/aboutUs', (req, res) => {
    return res.render("aboutUs")
})

router.get('/projects', (req, res) => {
    return res.render("projects")
})

router.get('/events', (req, res) => {
    return res.render("events")
})

router.post('/contactUs', async(req, res) => {
    const { name, email, query } = req.body
    await contact.create({
        name,
        email,
        query
    })
    return res.render('contactUs', {
        error: "Your query was sent, we'll respond to it as soon as poosible"
    })
})

router.get('/contactUs', (req, res) => {
    return res.render("contactUs", {
        error: null
    })
})

module.exports = router