import products from '../models/products.js'

export const createProduct = async (req, res) => {
  try {
    const result = await products.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file?.path || '',
      category: req.body.category,
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

export const deleteProduct = async (req, res) => {
  try {
    const result = await products.findByIdAndDelete(req.params.id)
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
      res.send({ success: false, message: '伺服器錯誤(deleteProduct)' })
    }
  }
}

export const getProducts = async (req, res) => {
  try {
    const result = await products.find({ sell: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getProducts)' })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getAllProducts)' })
  }
}

export const getProduct = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editProduct = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      sell: req.body.sell
    }
    if (req.file) data.image = req.file.path
    console.log(req.params.id)
    console.log(req.body)
    const result = await products.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(editProduct)' })
    }
  }
}
