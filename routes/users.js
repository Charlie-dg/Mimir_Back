import express from 'express'
import multer from 'multer'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import content from '../middleware/content.js'
import {
  register,
  login,
  logout,
  extend,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  addCart,
  editCart,
  getCart
} from '../controllers/users.js'

const router = express.Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.delete('/:id', auth.jwt, admin, deleteUser)
router.post('/extend', auth.jwt, extend)
router.patch('/:id', content('multipart/form-data'), auth.jwt, admin, updateUser)
router.get('/', auth.jwt, getUser)
router.get('/all', auth.jwt, getAllUser)
router.post('/cart', content('application/json'), auth.jwt, addCart)
router.patch('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)

export default router
