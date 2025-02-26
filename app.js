const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const { getUser } = require('./helpers/auth-helpers')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const methodOverride = require('method-override')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
const SESSION_SECRET = 'secret'

// const db = require('./models') 檢查 models 裡的檔案是否有正確運行 測試完就可刪了
// require 進來時 就執行了
app.engine('hbs', handlebars({ defaultLayout: 'main', extname: 'hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize()) // 初始化 ｐａｓｓｐｏｒｔ
app.use(passport.session())// 啟動 session 功能

app.use(flash())
app.use(methodOverride('_method'))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  // console.log('res.locals.user=', getUser(req))
  next()
})

app.use(routes)

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

module.exports = app
