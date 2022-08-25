import services from '../models/services.js'

export const createService = async (req, res) => {
  try {
    const result = await services.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      costTime: req.body.costTime,
      description: req.body.description,
      sell: req.body.sell
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(createProduct)' })
    }
  }
}

export const updateService = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      costTime: req.body.costTime,
      description: req.body.description,
      sell: req.body.sell
    }
    const result = await services.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤(updateService)' })
    }
  }
}

export const deleteService = async (req, res) => {
  try {
    const result = await services.findByIdAndDelete(req.params.id)
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
      res.send({ success: false, message: '伺服器錯誤(deleteService)' })
    }
  }
}

export const getAllService = async (req, res) => {
  try {
    const result = await services.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getAllService)' })
  }
}

export const getServices = async (req, res) => {
  try {
    const result = await services.find({ sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getServices)' })
  }
}

export const getService = async (req, res) => {
  try {
    const result = await services.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getService)' })
  }
}
