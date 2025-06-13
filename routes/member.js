const express = require("express")
const router = express.Router()
const member = require("../models/member")
const multer = require("multer")
const fs = require("fs")
const sharp = require('sharp')
const path = require("path")

router.get('/', async(req, res) => {
    const newMembs = await member.find({})
    return res.render("member", {
        newMembs
    })
})

const fileFilter = function(req, file, cb) {
    const allowedTypes = ['.png', '.jpg', '.jpeg', '.webp', '.heic']
    const ext = path.extname(file.originalname).toLowerCase()
    if(!allowedTypes.includes(ext)){
        return cb(new Error(`File format is not supported`))
    }
    cb(null, true)
}

const upload = multer({storage: multer.memoryStorage(), fileFilter})
 
router.get('/newMember', (req, res) => {
    return res.render("newMember", {error: null})
})

router.post('/newMember', (req, res) => {
    upload.single('profileImageURL')(req, res, async function(err) {
        if (err) {
            // Multer error (like file type not supported)
            return res.render("newMember", { error: err.message });
        }
        const { name, bio, role, githubURL, linkedInURL } = req.body;
        try {
            let profileImageURL;
            if (req.file) {
                const uploadPath = path.resolve(`./public/uploads/${name}`);
                fs.mkdirSync(uploadPath, { recursive: true });
                const webpFilename = `${path.parse(req.file.originalname).name}.webp`;
                const webpPath = path.join(uploadPath, webpFilename);

                // Convert to webp and save
                await sharp(req.file.buffer)
                    .rotate()    
                    .webp({ quality: 80 })
                    .toFile(webpPath);

                profileImageURL = webpFilename;
            }

            await member.create({
                name,
                profileImageURL,
                role,
                githubURL,
                linkedInURL,
                bio
            });
            return res.redirect('/member');
        } catch (e) {
            return res.render("newMember", { error: "An error occurred. Please try again." });
        }
    });
});

module.exports = router 