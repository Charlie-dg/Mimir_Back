export default (type) => {
  return (req, res, next) => {
    console.log('content:')
    console.log('req.headers:', req.headers['content-type'])
    console.log('type:', type)
    if (!req.headers['content-type'] || !req.headers['content-type'].includes(type)) {
      console.log('contentproblem:', req.headers['content-type'].includes(type))
      return res.status(400).send({ success: false, message: '資料格式錯誤' })
    }
    next()
  }
}
