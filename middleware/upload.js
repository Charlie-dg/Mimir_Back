import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image') && !file.mimetype.startsWith('avatar') && !file.mimetype.startsWith('portfolio')) {
      cb(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    fieldSize: 1024 * 1024
  }
})

export const multiple = async (req, res, next) => {
  console.log('uploadDesigner')
  console.log(req.file)
  upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'portfolio', maxCount: 4 }])(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = '上傳失敗(uploadDesigner)'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大(uploadDesigner)'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案格式錯誤(uploadDesigner)'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤(uploadDesigner)' })
    } else {
      next()
    }
  })
}

export const single = async (req, res, next) => {
  console.log('uploadSingle')
  console.log(req.file)
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = '上傳失敗(upload)'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大(upload)'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案格式錯誤(upload)'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤(upload)' })
    } else {
      next()
    }
  })
}
