module.exports = function (req, res, next) {
  const isUserAuthenticated = req.user
  if (isUserAuthenticated) {
    next()
  } else {
    console.log("USER NOT AUTHENTICATED", req.user)
    res.sendStatus(400)
  }
}
