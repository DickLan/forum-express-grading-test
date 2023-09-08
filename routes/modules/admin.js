// 模組化 改天想串接別的後台 可以直接換掉整個模組 為專案預留彈性

const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')

router.get('/users', adminController.getUsers)
router.get('/restaurants/create', adminController.createRestaurant)
// :id => req.params,id
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)

router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)
router.patch('/users/:id', adminController.patchUser)

router.use('/', (req, res) => res.redirect('/admin/restaurants'))
module.exports = router
