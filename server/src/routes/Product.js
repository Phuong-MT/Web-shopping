import expess from 'express'
import * as controller from '../controllers/Product'

const router = expess.Router()

router.get('/all', controller.getProduct)
router.get('/limit/:postId', controller.getProductLimit)
router.get('/sort', controller.getProductQR)
export default router