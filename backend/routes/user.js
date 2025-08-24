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
    try {
        const { name, email, query } = req.body;
        if (!name || !email || !query) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        await contact.create({
            name,
            email,
            query
        });
        return res.status(201).json({ success: true, message: "Your query was sent, we'll respond to it as soon as possible on your mentioned email" });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to submit query.' });
    }
})

router.get('/contactUs', async(req, res) => {
    try {
        const contacts = await contact.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, contacts });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
    }
})


module.exports = router