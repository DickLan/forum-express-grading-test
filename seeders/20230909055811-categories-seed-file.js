'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // bulk insert: insert date to table
    await queryInterface.bulkInsert('Categories',
      ['未選擇', '中式料理', '日本料理', '義大利料理', '墨西哥料理', '素食料理', '美式料理', '複合式料理']
        .map((item, index) => {
          return {
            name: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', {})
  }
}
