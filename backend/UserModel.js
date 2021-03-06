const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  email: { type: String, lowercase: true },
  password: String,
  username: { type: String },
  todos: { type: Array, default: [] },
})

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", UserSchema)

module.exports = User
