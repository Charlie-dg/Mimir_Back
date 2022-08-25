import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少服務名稱欄位']
  },
  category: {
    type: String,
    required: [true, '缺少服務項目欄位'],
    enum: {
      values: ['洗髮', '剪髮', '染髮', '燙髮', '護髮'],
      message: '服務項目錯誤'
    }
  },
  price: {
    type: Number,
    min: [0, '價格格式錯誤'],
    required: [true, '缺少價格欄位']
  },
  costTime: {
    type: Number,
    min: [0, '預計時間格式錯誤'],
    required: [true, '缺少預計時間欄位']
  },
  description: {
    type: String
  },
  sell: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export default mongoose.model('services', schema)
