const multer = require('multer')
// 呼叫mt提供的方法 設定上傳的圖片會暫存到temp資料夾
const upload = multer({ dest: 'temp/' })
// 導出功能 在其他地方使用
module.exports = upload
