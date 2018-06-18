const express = require("express")
const session = require("express-session")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const passport = require("passport")
const authenticateUser = require("./authenticateUser")

const app = express()
const PORT = process.env.PORT || 3001
const MONGO_URL = "mongodb://localhost:27017/todoTracker"

const UserModel = require("./UserModel")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(
  session({
    secret: "jfkdlsjfkldjslkejjfkdjlksjfkl",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
    },
  })
)

//Setup Passport
require("./passportSetup")
app.use(passport.initialize())
app.use(passport.session())

app.get("/getTodos", authenticateUser, (req, res) => {
  console.log("RETURNING USERS:", req.user.todos)
  res.send(req.user.todos)
})

app.get("/", (req, res) => {
  console.log("Getting index", req.user, req.isAuthenticated())
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"))
})

app.use(express.static(path.resolve(__dirname, "..", "build")))

app.get("/*", (req, res) => {
  console.log("Getting index", req.user, req.isAuthenticated())
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"))
})

let loginErrors
app.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local-login", (err, user, errors = {}) => {
      console.log("LOGGING in 2:", user, errors, Object.keys(errors).length)
      loginErrors = errors
      if (user) {
        res.status(200)

        req.logIn(user, err => {
          console.log("LOGGING IN req.logIn")
          if (err) {
            next(err)
          } else {
            next()
          }
        })
      } else {
        console.log("SETTING ERROR D:")
        res.status(400)
        next()
      }
    })(req, res, next)
  },
  (req, res) => {
    console.log("IN THE LAST CALLBACK :D", req.user)
    res.json(loginErrors)
  }
)

let signupErrors
app.post(
  "/signup",
  (req, res, next) => {
    passport.authenticate("local-signup", (err, user, errors = {}) => {
      console.log("SIGNING UP 2:", user, errors, Object.keys(errors).length)
      signupErrors = errors
      if (user) {
        res.status(200)

        req.logIn(user, err => {
          console.log("LOGGING IN req.logIn")
          if (err) {
            next(err)
          } else {
            next()
          }
        })
      } else {
        console.log("SETTING ERROR D:")
        res.status(400)
        next()
      }
    })(req, res, next)
  },
  (req, res) => {
    console.log("IN THE LAST SIGNUP CALLBACK :D", req.user)
    res.json(signupErrors)
  }
)

app.post("/saveTodos", authenticateUser, (req, res) => {
  const { todos } = req.body

  console.log("Saving todos:", todos, req.user)
  UserModel.findById(req.user.id)
    .then(user => {
      if (user) {
        user.todos = todos

        user
          .save()
          .then(user => {
            console.log("UPDATED USERS TODOS:", user)
            res.sendStatus(200)
          })
          .catch(err => {
            console.log("ERROR SAVING USERS TODOS:", err)
            res.sendStatus(500)
          })
      }
    })
    .catch(err => {
      console.log("ERROR FINDING USER WHILE SAVING TODOS:", err)
      res.sendStatus(500)
    })
})

//Connect to database
mongoose.connect(
  MONGO_URL,
  () => {
    console.log("CONNECTED TO DATABASE")
  }
)

app.listen(PORT, () => console.log("RUNNING ON PORT: ", PORT))
