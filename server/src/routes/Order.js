import expess from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as controller from '../controllers/Order'

const router = expess.Router()
router.use(verifyToken)
router.post('/', controller.postOrder)
router.get('/shopping-cart', controller.getOrder)
router.delete(`/:orderitemsId`, controller.DeleteOrder)
router.put('/:orderItemId',controller.UpdateOrder)
export default router