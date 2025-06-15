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
    return res.redirect('/contactUs?success=1')
})

router.get('/contactUs', async(req, res) => {
    const contacts = await contact.find({})
    const success = req.query.success
    return res.render("contactUs", {
        error: success ? "Your query was sent, we'll respond to it as soon as possible" : null,
        contacts
    })
})

module.exports = router