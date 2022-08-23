import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少設計師姓名欄位']
  },
  description: {
    type: String
  },
  profile: {
    type: [String]
  }
})

export default mongoose.model('designer', schema)
