const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
      .then(([categories, category]) => {
        res.render('admin/category', {
          categories, category
        })
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
  },
  putCategories: (req, res, next) => {
    // console.log(666666666)
    const categoryId = req.params.id
    // hbs name 取出 input value 值 category
    const name = req.body.category
    // console.log('req.body==============', req.body)
    // console.log('categoryId==============', categoryId)
    if (!name) throw new Error('Category name is required.')
    return Category.findByPk(categoryId)
      .then(category => {
        // console.log(777777777)
        if (!category) throw new Error("Category doesn't exist.")
        return category.update({ name: name })
      })
      .then(() => res.redirect('/admin/categories'))
      .catch(err => next(err))
  },
  deleteCategory: (req, res, next) => {
    Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("category doesn't exist")
        return category.destroy()
      })
      .then(() => {
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
