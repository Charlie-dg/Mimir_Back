export default (req, res, next) => {
  if (req.user.role !== '管理員') {
    res.status(403).send({ success: false, message: '權限不足' })
  } else {
    next()
  }
}
