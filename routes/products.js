import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  getProduct
} from '../controllers/products.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload.single, createProduct)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload.single, updateProduct)
router.delete('/:id', auth.jwt, admin, deleteProduct)
router.get('/all', auth.jwt, admin, getAllProducts)
router.get('/', getProducts)
router.get('/:id', getProduct)

export default router
