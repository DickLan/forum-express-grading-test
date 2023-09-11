// 模組化 改天想串接別的後台 可以直接換掉整個模組 為專案預留彈性

const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')
const categoryController = require('../../controllers/categoryController')

// restaurant
router.get('/restaurants/create', adminController.createRestaurant)
// :id => req.params,id
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)

router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)
// users
router.get('/users', adminController.getUsers)
router.patch('/users/:id', adminController.patchUser)

// category
// 瀏覽 get 編輯分類的表單
router.get('/categories/:id', categoryController.getCategories)
router.put('/categories/:id', categoryController.putCategories)
router.delete('/categories/:id', categoryController.deleteCategory)
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategories)

router.use('/', (req, res) => res.redirect('/admin/restaurants'))
module.exports = router
