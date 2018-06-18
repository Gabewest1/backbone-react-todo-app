module.exports = function(req, res, next) {
  if (req.user) {
    next()
  } else {
    console.log("USER NOT AUTHENTICATED", req.user)
    res.sendStatus(400)
  }
}
