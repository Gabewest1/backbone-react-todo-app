const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieSession = require("cookie-session")
const path = require("path")

const app = express()

const UserModel = require("./UserModel")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001

mongoose.connect(
  "mongodb://localhost:27017/todoTracker",
  () => {
    console.log("CONNECTED TO DATABASE")
  }
)

app.use(
  cookieSession({
    keys: ["thiskeyencryptsdata"],
    maxAge: 24 * 60 * 60 * 1000,
    saveUninitialized: true,
    resave: false
  })
)

app.put("/saveme", (req, res) => {
  console.log("SAVEME")
  res.end()
})

app.post("/login", (req, res) => {
  const { username, password } = req.body
  console.log("LOGGING in:", username, password)

  const query = {
    $or: [
      { username: { $regex: `^${username}$`, $options: "i" } },
      { email: { $regex: `^${username}$`, $options: "i" } }
    ]
  }

  UserModel.findOne(query, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      const errors = {}

      const foundUser =
        user && (user.username === username || user.email === username)
      const isValidPassword = foundUser && user.validPassword(password)

      errors.username = !foundUser ? "User not found" : undefined

      errors.password = !isValidPassword ? "Incorrect password" : undefined

      const isTheirErrors = errors.username || errors.password

      if (isTheirErrors) {
        res.status(400)
        res.json(errors)
      } else {
        console.log("FOUND USER:", user)
        res.sendStatus(200)
      }
    }
  })
})

app.post("/signup", (req, res) => {
  let { email, username, password } = req.body
  console.log("SIGNING UP:", username, password)

  username = username.toLowerCase()
  password = password.toLowerCase()
  email = email.toLowerCase()

  const query = {
    $or: [
      { username: { $regex: `^${username}$`, $options: "i" } },
      { email: { $regex: `^${email}$`, $options: "i" } }
    ]
  }

  UserModel.findOne(query, (err, user) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else if (user) {
      const errors = {}

      errors.username =
        user.username === username ? "Username taken" : undefined
      errors.email = user.email === email ? "Email taken" : undefined

      res.status(400)
      res.json(errors)
    } else {
      const newUser = new UserModel()

      newUser.username = username
      newUser.email = email
      newUser.password = newUser.generateHash(password)

      newUser.save((err, user) => {
        if (err) {
          console.log(err)
          res.sendStatus(500)
        } else {
          console.log("Created new User:", user)
          res.sendStatus(200)
        }
      })
    }
  })
})

app.listen(PORT, () => console.log("RUNNING ON PORT: ", PORT))
