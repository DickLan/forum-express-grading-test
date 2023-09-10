const dayjs = require('dayjs')

// helpers 匯出後，需要到 app.js掛載到 app.engine
module.exports = {
  currentYear: () => dayjs().year(),

  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }

}
