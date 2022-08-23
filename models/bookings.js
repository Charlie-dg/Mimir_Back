import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users',
    required: [true, '缺少使用者欄位']
  },
  services: [
    {
      service: {
        type: mongoose.ObjectId,
        ref: 'services',
        required: [true, '缺少服務項目欄位']
      }
    }
  ],
  designers: {
    type: mongoose.ObjectId,
    ref: 'designers',
    required: [true, '缺少設計師欄位']
  },
  date: {
    type: Date,
    default: Date.now(),
    required: [true, '缺少預約日期欄位']
  },
  time: {
    type: String,
    required: [true, '缺少預約時段欄位']
  },
  notes: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('bookings', schema)
