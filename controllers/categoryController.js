const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    Category.findAll({
      raw: true
    })
      .then(categories => {
        res.render('admin/category', ({ categories }))
      })
      .catch(err => next(err))
  },
  postCategories: (req, res, next) => {
    const name = req.body.category
    // console.log(req.body)
    if (!name) throw new Error('Category name is required.')
    Category.create({
      name
    })
      .then(() => {
        req.flash('success_messages', 'category was successfully created')
        res.redirect('/admin/categories')
      })
  }
}

module.exports = categoryController
