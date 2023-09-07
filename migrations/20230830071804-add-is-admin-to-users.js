'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 在直接操作資料庫的情況 字串isAdmin並不會自動被轉換成snake_case 所以直接操作資料庫時 要直接寫成資料庫欄位的名稱 is_admin
    await queryInterface.addColumn('Users', 'is_admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'is_admin')
  }
}
