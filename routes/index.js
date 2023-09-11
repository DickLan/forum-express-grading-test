const express = require('express')
const router = express.Router()
const passport = require('passport')
// 載入 controller
const admin = require('./modules/admin')
const restController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')
router.use('/admin', authenticatedAdmin, admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/restaurants/:id', restController.getRestaurant)

router.get('/restaurants', authenticated, restController.getRestaurants)
// 設定 fallback 路由：當其他路由條件都不符合時，最終會接到這條路由來
// 而這條路由的意義是  當連接到根目錄  http://localhost:3000 就會導向restaurant
router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// 其他任何錯誤 都導向 fault 單純自己寫來測試功能
// router.get('*', (req, res) => {
//   // 如果是 redirect('/fault') 則會重新導向 /fault路由 ， 但就需要另外定義 router.get('fault')...這條路由才能使用
//   res.render('fault')
// })
router.use('/', generalErrorHandler) // 設定 error handler
// 這樣有錯誤發生時，才會跳到這個 middleware來處理

module.exports = router
