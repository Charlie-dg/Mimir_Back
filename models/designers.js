import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少設計師姓名欄位']
  },
  description: {
    type: String
  },
  avatar: {
    type: String
  },
  portfolio: {
    type: [String]
  },
  publish: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export default mongoose.model('designers', schema)
