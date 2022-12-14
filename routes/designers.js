import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import {
  createDesigner,
  deleteDesigner,
  updateDesigner,
  getAllDesigners,
  getDesigner,
  getDesigners
} from '../controllers/designers.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload.multiple, createDesigner)
router.delete('/:id', auth.jwt, admin, deleteDesigner)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload.multiple, updateDesigner)
router.get('/all', auth.jwt, admin, getAllDesigners)
router.get('/:id', getDesigner)
router.get('/', getDesigners)

export default router
