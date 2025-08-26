const express = require("express")
const router = express.Router()
const contact = require('../models/contact');
const Member = require("../models/member");

router.get('/', (req, res) => {
    try {
        return res.status(200).json({ message: 'HomePage loaded' });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` })
    }
})

router.get('/aboutUs', (req, res) => {
    try {
        return res.status(200).json({ message: 'About Us Page loaded' });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` })
    }
})

router.get('/events', (req, res) => {
    try {
        return res.status(200).json({ message: 'Events page loaded' });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` })
    }
})

router.get('/projects', (req, res) => {
    try {
        return res.status(200).json({ message: 'projects page loaded' });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` })
    }
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
        const reviews = await contact.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, reviews });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
    }
})


module.exports = router