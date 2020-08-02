const passport = require('passport')

exports.isUserAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/users/init-session')
}