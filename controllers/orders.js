import users from '../models/users.js'
import orders from '../models/orders.js'

export const createOrder = async (req, res) => {
  try {
    if (req.user.cart.length === 0) {
      return res.status(400).send({ success: false, message: '購物車為空' })
    }
    let result = await users.findById(req.user._id, 'cart').populate('cart.product')
    const canCheckout = result.cart.every(item => item.product.sell)
    if (!canCheckout) {
      return res.status(400).send({ success: false, message: '包含下架商品' })
    }
    result = await orders.create({ user: req.user._id, products: req.user.cart })
    req.user.cart = []
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: result._id })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(createOrder)' })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const result = await orders.findByIdAndDelete(req.params.id)
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
      res.send({ success: false, message: '伺服器錯誤(deleteUser)' })
    }
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const result = await orders.find({ user: req.user._id }).populate('products.product')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getMyOrders)' })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const result = await orders.find().populate('products.product').populate('user', 'account')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getAllOrders)' })
  }
}
