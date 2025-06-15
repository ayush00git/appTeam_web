const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const member = require("../models/member");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get('/', async(req, res) => {
    const newMembs = await member.find({})
    return res.render("member", {
        newMembs
    })
})

const fileFilter = function (req, file, cb) {
  const allowedTypes = [".png", ".jpg", ".jpeg", ".webp", ".heic"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error("File format is not supported"));
  }
  cb(null, true);
}; 

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
}); 

router.get("/newMember", (req, res) => {
  return res.render("newMember", { error: null });
});

router.post("/newMember", async (req, res) => {
  upload.single("profileImageURL")(req, res, async function (err) {
    if (err) {
      return res.render("newMember", {
        error: err.message,
      });
    }
    const { name, bio, role, githubURL, linkedInURL } = req.body;

    try {
      let profileImageURL = null;
      let imageId = null;

      if (req.file) {
        imageId = uuidv4();

        const webpBuffer = await sharp(req.file.buffer)
          .rotate()
          .webp({ quality: 80 })
          .toBuffer();

        const result = await cloudinary.uploader.upload(
          `data:image/webp;base64,${webpBuffer.toString("base64")}`,
          {
            resource_type: "image",
            folder: `team-members/${imageId}`,
            public_id: "profile",
            format: "webp",
          }
        );
        profileImageURL = result.secure_url;
      }
      await member.create({
        name,
        bio,
        role,
        profileImageURL,
        githubURL,
        linkedInURL,
      });
      return res.redirect('/member')
    } catch (error) {
      console.error(`Upload error: ${error}`);
      return res.render("newMember", {
        error: `Failed to upload image, please try again`,
      });
    }
  });
});

module.exports = router