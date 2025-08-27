const { Schema, model } = require("mongoose");

const annSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    isActive: {
      type: String,
      enum: ["Active", "Inactive"], // only these two values allowed
      default: "Active",
    },
  },
  { timestamps: true }
);

const announcement = model("announcements", annSchema);
module.exports = announcement;
