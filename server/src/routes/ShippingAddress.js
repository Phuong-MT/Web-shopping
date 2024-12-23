import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as ShippingAddressController from '../controllers/ShippingAddress'

const router = express.Router()
router.use(verifyToken)
router.post('/ShippingAddress', ShippingAddressController.postShippingAddress)

export default router