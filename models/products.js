import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少商品名稱欄位']
  },
  price: {
    type: Number,
    min: [0, '價格格式錯誤'],
    required: [true, '缺少價格欄位']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: [true, '缺少種類欄位'],
    enum: {
      values: ['洗髮系列', '護髮系列', '造型梳', '造型夾', '電捲棒', '吹風機'],
      message: '商品種類錯誤'
    }
  },
  sell: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export default mongoose.model('products', schema)
