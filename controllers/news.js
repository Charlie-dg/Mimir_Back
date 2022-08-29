import news from '../models/news.js'

export const createNew = async (req, res) => {
  try {
    const result = await news.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file?.path || '',
      publish: req.body.publish
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(createNew)' })
    }
  }
}

export const updateNew = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      publish: req.body.publish
    }
    if (req.file) data.image = req.file.path
    const result = await news.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(updateNew)' })
    }
  }
}

export const deleteNew = async (req, res) => {
  try {
    const result = await news.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '' })
    }
  } catch (error) {
    // 若 ID 格式不是 mongodb 格式
    if (error.name === 'CastError') {
      res.status(404)
      res.send({ success: false, message: '找不到資料' })
    } else {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤(deleteNew)' })
    }
  }
}

export const getAllNews = async (req, res) => {
  try {
    const result = await news.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getAllNews)' })
  }
}

export const getNews = async (req, res) => {
  try {
    const result = await news.find({ publish: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getNews)' })
  }
}

export const getNew = async (req, res) => {
  try {
    const result = await news.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getNew)' })
  }
}
