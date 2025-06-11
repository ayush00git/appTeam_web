const express = require("express")
const router = express.Router()
const user = require("../models/user")

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

module.exports = router