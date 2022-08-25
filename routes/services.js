import express from 'express'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import content from '../middleware/content.js'
import upload from '../middleware/upload.js'
import {
  createService,
  updateService,
  deleteService,
  getAllService,
  getServices,
  getService
} from '../controllers/services.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload, createService)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload, updateService)
router.delete('/:id', auth.jwt, admin, deleteService)
router.get('/all', auth.jwt, admin, getAllService)
router.get('/', getServices)
router.get('/:id', getService)

export default router
