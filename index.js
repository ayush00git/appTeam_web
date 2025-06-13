const express = require("express")
const { connectMongo } = require("./connection")
const app = express()
const path = require("path")


const PORT = 8000 || process.env.PORT

const userRouter = require("./routes/user")
const memberRouter = require("./routes/member")

connectMongo('mongodb://127.0.0.1:27017/AppTeam')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(`Mongo error: ${err}`))

app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.use("/", userRouter)
app.use("/member", memberRouter)

app.use((req, res, next) => {
    res.status(404).render("404");
})
app.listen(PORT, () => console.log(`Server started at port http://localhost:${PORT}`))