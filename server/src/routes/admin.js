import express from 'express'
import * as adminController from '../controllers/admin'

const router = express.Router()

router.post('/login', adminController.login)
router.get('/infoUser', adminController.InfoUser)
router.get('/product', adminController.GetproductAdmin)
export default router