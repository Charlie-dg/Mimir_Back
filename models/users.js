import mongoose from 'mongoose'
import validator from 'validator'

const schema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, '缺少帳號欄位'],
    minlength: [4, '帳號必須 4 個字以上'],
    maxlength: [20, '帳號必須 20 個字以下'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤']
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    /* required: [true, '缺少姓名欄位'], */
    maxlength: [10, '名字必須 10 個字以下']
  },
  gender: {
    type: String
  },
  phone: {
    type: Number,
    maxlength: [10, '手機必須 10 個數字以下'],
    match: [/^[0-9]+$/, '手機格式錯誤']
  },
  email: {
    type: String,
    required: [true, '缺少信箱欄位'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  address: {
    type: String,
    maxlength: [50, '地址必須 50 個字以下']
  },
  role: {
    type: String, // 會員, 管理員
    default: '會員'
  },
  cart: {
    type: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: 'products',
          required: [true, '缺少商品欄位']
        },
        quantity: {
          type: Number,
          required: [true, '缺少數量欄位']
        }
      }
    ]
  },
  /*  myorders: [
    {
      type: mongoose.ObjectId,
      ref: 'orders',
      required: [true, '缺少訂單欄位']
    }
  ],  */
  /*  mybookings: [
    {
      type: mongoose.ObjectId,
      ref: 'bookings',
      required: [true, '缺少預約欄位']
    }
  ],  */
  tokens: {
    type: [String]
  }
}, { versionKey: false })

export default mongoose.model('users', schema)
