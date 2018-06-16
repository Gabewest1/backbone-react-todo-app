const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const app = express()
const PORT = process.env.PORT || 3001

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
      maxAge: null,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  console.log("Getting index", req.user, req.isAuthenticated())
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"))
})

app.use(express.static(path.resolve(__dirname, "..", "build")))

app.get("/*", (req, res) => {
  console.log("Getting index", req.user, req.isAuthenticated())
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"))
})

app.put("/saveme", (req, res) => {
  console.log("SAVEME")
  res.end()
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
          }
        })
      } else {
        console.log("SETTING ERROR D:")
        res.status(400)
      }

      next()
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
          }
        })
      } else {
        console.log("SETTING ERROR D:")
        res.status(400)
      }

      next()
    })(req, res, next)
  },
  (req, res) => {
    console.log("IN THE LAST SIGNUP CALLBACK :D", req.user)
    res.json(signupErrors)
  }
)

passport.use(
  "local-login",
  new LocalStrategy((username, password, done) => {
    console.log("LOGGING in:", username, password)

    const query = {
      $or: [
        { username: { $regex: `^${username}$`, $options: "i" } },
        { email: { $regex: `^${username}$`, $options: "i" } },
      ],
    }

    UserModel.findOne(query, (err, user) => {
      if (err) {
        console.log(err)
        done(err)
      } else {
        const errors = {}

        const foundUser = user && (user.username === username || user.email === username)
        const isValidPassword = foundUser && user.validPassword(password)

        errors.username = !foundUser ? "User not found" : undefined

        if (!errors.username) {
          errors.password = !isValidPassword ? "Incorrect password" : undefined
        }

        const isTheirErrors = errors.username || errors.password

        if (isTheirErrors) {
          done(null, false, errors)
        } else {
          console.log("FOUND USER:", user)
          done(null, user)
        }
      }
    })
  })
)

passport.use(
  "local-signup",
  new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
    username = req.body.username.toLowerCase()
    password = req.body.password.toLowerCase()
    email = req.body.email.toLowerCase()

    console.log("SIGNING UP:", email, username, password)

    const query = {
      $or: [
        { username: { $regex: `^${username}$`, $options: "i" } },
        { email: { $regex: `^${email}$`, $options: "i" } },
      ],
    }

    UserModel.findOne(query, (err, user) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else if (user) {
        const errors = {}

        errors.username = user.username === username ? "Username taken" : undefined
        errors.email = user.email === email ? "Email taken" : undefined

        console.log("FOUND AN EXISTING USER:", errors)
        next(null, null, errors)
      } else {
        console.log("ABOUT TO MAKE NEW USER")
        const newUser = new UserModel()

        newUser.username = username
        newUser.email = email
        newUser.password = newUser.generateHash(password)

        newUser.save((err, user) => {
          if (err) {
            console.log(err)
            next(err)
          } else {
            console.log("Created new User:", user)
            next(null, user)
          }
        })
      }
    })
  })
)

passport.serializeUser((user, done) => {
  console.log(`serializeUser: ${user}`)
  done(null, user)
})

passport.deserializeUser((user, done) => {
  console.log(`deserializeUser: ${user}`)
  done(null, user)
})

//Connect to database
mongoose.connect(
  "mongodb://localhost:27017/todoTracker",
  () => {
    console.log("CONNECTED TO DATABASE")
  }
)

app.listen(PORT, () => console.log("RUNNING ON PORT: ", PORT))
