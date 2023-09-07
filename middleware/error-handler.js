module.exports = {
  generalErrorHandler(err, req, res, next) {
    if (err instanceof Error) {
      // instanceof: 檢查 err是否為error物件
      req.flash('error_messages', `${err.name}:${err.message}`)
    } else {
      req.flash('error_message', `${err}`)
    }
    res.redirect('back') // 導回前一個畫面
    next(err)
  }
}
