import express from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import * as upload from '../middleware/upload.js'
import {
  createNew,
  updateNew,
  deleteNew,
  getAllNews,
  getNews,
  getNew
} from '../controllers/news.js'

const router = express.Router()

router.post('/', content('multipart/form-data'), auth.jwt, admin, upload.single, createNew)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, upload.single, updateNew)
router.delete('/:id', auth.jwt, admin, deleteNew)
router.get('/all', auth.jwt, admin, getAllNews)
router.get('/', getNews)
router.get('/:id', getNew)

export default router
