const express = require("express")
const router = express.Router()
const member = require("../models/member")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

router.get('/', async(req, res) => {
    const newMembs = await member.find({})
    return res.render("member", {
        newMembs
    })
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // const uploadPath = path.resolve(`./public/uploads/${req.user.userName}`)
        const uploadPath = path.resolve(`./public/uploads/${req.body.name}`)

        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename: function(req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage})

router.get('/newMember', (req, res) => {
    return res.render("newMember")
})

router.post('/newMember', upload.single('profileImageURL'), async(req, res) => {
    const { name, bio, role, githubURL, linkedInURL } = req.body
    const newMemb = await member.create({
        name,
        profileImageURL: req.file? req.file.filename : undefined,
        role,
        githubURL,
        linkedInURL, 
        bio
    })
    return res.redirect('/member')
})

module.exports = router  