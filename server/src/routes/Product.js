import expess from 'express'
import * as controller from '../controllers/Product'

const router = expess.Router()

router.get('/all', controller.getProduct)
router.get('/limit/:postId', controller.getProductLimit)
router.get('/sort', controller.getProductQR)
router.get('/tim-kiem', controller.getProductSreach)
router.post('/create/productId', controller.PostCreatePorduct)
router.post('/delete/productId',controller.PostDeleteProduct)
router.post('/update/productId',controller.UpdateInfoProduct)
export default router