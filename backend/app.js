require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./connection");
const app = express();

const userRouter = require("./routes/user");
const memberRouter = require("./routes/member");
const announcementRouter = require("./routes/announcements");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

app.use("/", userRouter);
app.use("/member", memberRouter);
app.use("/announcements", announcementRouter);

// app.use((req, res, next) => {
//   res.status(404).render("404");
// });

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

