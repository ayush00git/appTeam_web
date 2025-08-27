const express = require('express')
const router = express.Router()

const announcement = require("../models/announcement")

router.get('/', async(req, res) => {
    try {
        const announcements = await announcement.find({}).sort({createdAt : -1})
        return res.json({ announcements });
    } catch (error) {
        return res.status(400).json({ message: `${error}` })        
    }
})

router.post(`/admin_only/${process.env.ROUTE_SECRET}`, async(req, res) => {
    try {
        const { title, date, content } = req.body;
        if (!title || !date || !content) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        await announcement.create({
            title,
            date: new Date(),
            content
        });
        return res.status(201).json({ success: true, message: 'Announcement posted successfully!' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to post announcement.' });
    }
});
module.exports = router