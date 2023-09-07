const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')
const authenticated = (req, res, next) => {
  // console.log(123)
  // if (req.isAuthenticated)
  if (ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  // if (req.isAuthenticated)
  // console.log(456)
  if (ensureAuthenticated(req)) {
    // console.log(7)
    if (getUser(req).isAdmin) return next()
    res.redirect('/')
  } else {
    // console.log(8)
    res.redirect('/signin')
  }
}
module.exports = {
  authenticated,
  authenticatedAdmin
}
