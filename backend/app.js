require("dotenv").config();

const express = require("express");
const { connectMongo } = require("./connection");
const app = express();
const path = require("path");

const userRouter = require("./routes/user");
const memberRouter = require("./routes/member");
const announcementRouter = require("./routes/announcements");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", userRouter);
app.use("/member", memberRouter);
app.use("/announcements", announcementRouter);

app.use((req, res, next) => {
  res.status(404).render("404");
});

connectMongo(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
    console.log(`Server started at port http://localhost:${PORT}`)
});
})
.catch((err) => {
    console.log(`Mongo error: ${err}`)
});

