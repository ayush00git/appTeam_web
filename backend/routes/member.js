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

// GET /member - return all members as JSON
router.get('/', async (req, res) => {
  try {
    const newMembs = await member.find({});
    return res.json(newMembs);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch members' });
  }
});

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

// POST /member/newMember - handle form, return JSON
router.post(`/admin_only/newMember/${process.env.ROUTE_SECRET}`, async (req, res) => {
  upload.single("profileImageURL")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
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
      const created = await member.create({
        name,
        bio,
        role,
        profileImageURL,
        githubURL,
        linkedInURL,
      });
      return res.status(201).json({ success: true, member: created });
    } catch (error) {
      console.error(`Upload error: ${error}`);
      return res.status(500).json({ error: `Failed to upload image, please try again` });
    }
  });
});

module.exports = router