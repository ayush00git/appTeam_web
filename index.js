const express = require("express")
const { connectMongo } = require("./connection")
const app = express()
const path = require("path")


const PORT = 8000 || process.env.PORT

const userRouter = require("./routes/user")
const memberRouter = require("./routes/member")
const cookieParser = require("cookie-parser")

connectMongo('mongodb://127.0.0.1:27017/AppTeam')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(`Mongo error: ${err}`))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.get('/', (req, res) => {
    return res.render("home")
})

app.use("/user", userRouter)
app.use("/member", memberRouter)

app.listen(PORT, () => console.log(`Server started at port http://localhost:${PORT}`))