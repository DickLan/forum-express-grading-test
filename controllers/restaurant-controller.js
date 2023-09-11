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
  }
}

module.exports = restaurantController
