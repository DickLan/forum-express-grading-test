const getUser = req => {
  return req.user || null
}
// 新增這裡
const ensureAuthenticated = req => {
  return req.isAuthenticated()
}
module.exports = {
  getUser,
  ensureAuthenticated // 新增這裡
}
// exports 什麼， require就會拿到什麼
// exports時是 {} ， 那在另一個檔案引入時， 也需要寫成 {xx} = require('...auth-helpers')
