const { Schema, model } = require("mongoose");

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profileImageURL: {
      type: String,
      default: "./uploads/default.png",
    },
    role: {
      type: String,
      required: true,
      enum: [
        "Alumni",
        "Club Coordinator",
        "Convener",
        "Club Secretary",
        "Executive Member",
        "Volunteer",
      ],
    },
    imageId: {
      type: String,
    },
    linkedInURL: {
      type: String,
      required: true,
    },
    githubURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const member = model("members", memberSchema);

module.exports = member;