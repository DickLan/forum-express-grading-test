const { Restaurant, User } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { raw } = require('express')

const adminController = {
  getRestaurants: (req, res, next) => {
    Restaurant.findAll({
      raw: true
    })
      .then(restaurants => {
        // console.log('restaurants', restaurants)
        res.render('admin/restaurants', ({ restaurants }))
      }
      )
      .catch(err => next(err))
  },

  createRestaurant: (req, res) => {
    return res.render('admin/create-restaurant')
  },

  postRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    const { file } = req // const file = req.file
    // name 是必填，若發現是空值就中止程式碼，並在畫面顯示錯誤  這裡的 error 拋出後由 middleware error-handler處理
    if (!name) throw new Error('Restaurant name is required.')
    imgurFileHandler(file)
      .then(filePath => Restaurant.create({
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || null
      }))
      .then(() => {
        req.flash('success_messages', 'restaurant was successfully created')
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  },
  getRestaurant: (req, res, next) => {
    Restaurant.findByPk(req.params.id, {
      raw: true
    })
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exits.")
        res.render('admin/restaurant', { restaurant })
      })
      .catch(err => next(err))
  },

  // go to edit page
  editRestaurant: (req, res, next) => {
    Restaurant.findByPk(req.params.id, {
      raw: true
    })
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't ExclusionConstraintError.")
        res.render('admin/edit-restaurant', { restaurant })
      })
  },
  // button submit
  putRestaurant: (req, res, next) => {
    const { name, tel, address, openingHours, description } = req.body
    const file = req.file
    if (!name) throw new Error('Restaurant name is required!')
    // promise.all 會執行玩[]內的所有promise，才繼續下一個then，若兩個promise都有回傳，下一個then就回得到兩個值
    Promise.all([
      Restaurant.findByPk(req.params.id),
      imgurFileHandler(file)
    ])
      .then(([restaurant, filePath]) => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        return restaurant.update({
          name,
          tel,
          address,
          openingHours,
          description,
          image: filePath || restaurant.image
          // 如果有 filePath表示使用者有上傳新照片，若沒有則沿用原本資料庫的值
        })
      })
      .then(() => {
        // console.log('123')
        req.flash('success_messages', 'restaurant was successfully updated')
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  },
  // delete

  deleteRestaurant: (req, res, next) => {
    Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error("restautant doesn't exist.")
        return restaurant.destroy()
      })
      .then(() => {
        req.flash('success_messages', 'restaurant was deleted')
        res.redirect('/admin/restaurants')
      })
      .catch(err => next(err))
  },
  // ========================User==================
  // get users
  getUsers: (req, res, next) => {
    User.findAll({
      raw: true
    })
      .then(users => {
        res.render('admin/users', ({ users }))
      })
      .catch(err => next(err))
  },

  patchUser: (req, res, next) => {
    console.log('patch')
    User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error("user doesn't exist")
        // console.log(user)
        if (user.isAdmin === true) {
          // console.log('TTTTT==================')
          return user.update({
            isAdmin: false
          })
        } else {
          return user.update({
            isAdmin: true
          })
        }
      })
      .then(() => {
        req.flash('success_messages', 'role has been changed.')
        res.redirect('/admin/users')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
