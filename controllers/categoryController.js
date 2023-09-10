const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    Category.findAll({
      raw: true
    })
      .then(categories => {
        res.render('admin/category', ({ categories }))
      })
  }
}

module.exports = categoryController
