const { Restaurant, Category } = require('../models')

const restaurantController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({
      include: Category,
      nest: true,
      raw: true
    })
      .then(restaurants => {
        const data = restaurants.map(r => {
          if (r.description) {
            r.description = r.description.substring(0, 50)
          }
          return r
        })

        console.log(data[0])
        return res.render('restaurants', {
          restaurants: data
        })
      })
  },
  getRestaurant: (req, res, next) => {
    const id = req.params.id
    return Restaurant.findByPk(id, {
      include: Category,
      nest: true,
      raw: true
    })
      .then(restaurant => {
        if (!restaurant) throw new Error('no this restaurant')
        return res.render('restaurant', { restaurant })
      })
      .catch(err => next(err))
  }
}

module.exports = restaurantController
