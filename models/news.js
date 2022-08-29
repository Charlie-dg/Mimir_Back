import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '缺少消息標題']
  },
  description: {
    type: String,
    required: [true, '缺少消息內容']
  },
  image: {
    type: String,
    required: [true, '缺少消息圖片']
  },
  publish: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export default mongoose.model('news', schema)
