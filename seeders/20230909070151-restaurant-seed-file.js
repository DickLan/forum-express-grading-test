'use strict'
// categories seed 要在 restaurant seed之前
// restaurant seed才讀的到ＦＫ
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // check what id in Categories now
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories',
      // type: 表示要指定查詢的類別 select表示一個select查詢
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    await queryInterface.bulkInsert('Restaurants',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        opening_hours: '08:00',
        image: `https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}`,
        descriptions: faker.lorem.text(),
        created_at: new Date(),
        updated_at: new Date(),
        category_id: categories[Math.floor(Math.random() * (categories.length - 1))].id + 1
      })))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', {})
  }
}
