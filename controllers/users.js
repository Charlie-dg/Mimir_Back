import users from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import products from '../models/products.js'

export const register = async (req, res) => {
  const password = req.body.password
  if (!password) {
    return res.status(400).send({ success: false, message: '缺少密碼欄位' })
  }
  if (password.length < 4) {
    return res.status(400).send({ success: false, message: '密碼必須 4 個字以上' })
  }
  if (password.length > 20) {
    return res.status(400).send({ success: false, message: '密碼必須 20 個字以下' })
  }
  if (!password.match(/^[A-Za-z0-9]+$/)) {
    return res.status(400).send({ success: false, message: '密碼格式錯誤' })
  }
  req.body.password = bcrypt.hashSync(password, 10)
  try {
    await users.create(req.body)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已存在' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(register)' })
    }
  }
}

export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET, { expiresIn: '1 days' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(200).send({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        cart: req.user.cart.length,
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(login)' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(logout)' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id }, process.env.SECRET, { expiresIn: '1 days' })
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: token })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(extend)' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const data = {
      account: req.body.account,
      name: req.body.name,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      role: req.body.role
    }
    const result = await users.findByIdAndUpdate(req.params.id, data, { new: true })
    delete result.password
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤(updateUser)' })
    }
  }
}

export const deleteUser = async (req, res) => {
  try {
    const result = await users.findByIdAndDelete(req.params.id)
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

export const getAllUser = async (req, res) => {
  try {
    const result = await users.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getAllUser)' })
  }
}

export const getUser = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        name: req.user.name,
        gender: req.user.gender,
        phone: req.user.phone,
        email: req.user.email,
        address: req.user.address,
        cart: req.user.cart.length,
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getUser)' })
  }
}

export const addCart = async (req, res) => {
  try {
    const result = await products.findById(req.body.product)
    if (!result || !result.sell) {
      console.log(req.body.product)
      return res.status(404).send({ success: false, message: '商品不存在' })
    }
    const idx = req.user.cart.findIndex(item => item.product.toString() === req.body.product)
    if (idx > -1) {
      req.user.cart[idx].quantity += req.body.quantity
    } else {
      req.user.cart.push({
        product: req.body.product,
        quantity: req.body.quantity
      })
    }
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: req.user.cart.length })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(addCart)' })
    }
  }
}

export const editCart = async (req, res) => {
  try {
    // console.log('editCart: ')
    // console.log('req.user._id: ', req.user._id)
    // console.log('req.body.product: ', req.body.product)
    // console.log('req.body.quantity: ', req.body.quantity)
    if (req.body.quantity <= 0) {
      await users.findOneAndUpdate(
        { _id: req.user._id, 'cart.product': req.body.product },
        {
          $pull: {
            cart: { product: req.body.product }
          }
        }
      )
    } else {
      await users.findOneAndUpdate(
        { _id: req.user._id, 'cart.product': req.body.product },
        {
          $set: {
            'cart.$.quantity': req.body.quantity
          }
        }
      )
    }
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    // console.log('editCart error: ', error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤(editCart)' })
    }
  }
}

export const getCart = async (req, res) => {
  try {
    const result = await users.findById(req.user._id, 'cart').populate('cart.product')
    res.status(200).send({ success: true, message: '', result: result.cart })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤(getCart)' })
  }
}
