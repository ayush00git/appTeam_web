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

const fileFilter = function(req, file, cb) {
    const allowedTypes = ['.png', '.jpg', '.jpeg', '.webp', '.heic']
    const ext = path.extname(file.originalname).toLowerCase()
    if(!allowedTypes.includes(ext)){
        return cb(new Error(`Files format not supported`))
    }
    cb(null, true)
}

const upload = multer({storage, fileFilter})
 
router.get('/newMember', (req, res) => {
    return res.render("newMember", {error: null})
})

router.post('/newMember', async(req, res) => {
    upload.single('profileImageURL')(req, res, async function(err){
        if(err){
            return res.render("newMember", {error: err.message})
        }
    })
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