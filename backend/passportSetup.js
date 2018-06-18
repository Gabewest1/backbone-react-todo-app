const passport = require("passport")
const UserModel = require("./UserModel")
const LocalStrategy = require("passport-local").Strategy

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
  console.log(`serializeUser: ${user}`, user.id)
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  console.log(`deserializeUser: ${userId}`)
  UserModel.findById(userId)
    .then(user => {
      done(null, user)
    })
    .catch(err => done(err))
})
