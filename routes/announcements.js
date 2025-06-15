const express = require('express')
const router = express.Router()

const announcement = require("../models/announcement")

router.get('/', async(req, res) => {
    const announcements = await announcement.find({}).sort({createdAt : -1})
    return res.render('ann1', {
        announcements
    })
})

router.get('/admin_only', (req, res) => {
    return res.render('admin_pass')
})

router.get('/admin_only/onlyteams', (req, res) => {
    return res.render('writeann')
})

router.post('/admin_only/onlyteams', async(req, res) => {
    const { title, date, content } = req.body
    await announcement.create({
        title,
        date,
        content
    })
    return res.redirect('/announcements')
})
module.exports = router