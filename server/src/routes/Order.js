import expess from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as controller from '../controllers/Order'

const router = expess.Router()
router.get('/InfoOrder/OrderInAdmin', controller.getInfoOrderAdmin)
router.use(verifyToken)
router.post('/', controller.postOrder)
router.get('/shopping-cart', controller.getOrder)
router.delete(`/:orderitemsId`, controller.DeleteOrder)
router.put('/:orderItemId',controller.UpdateOrder)
router.get('/:id',controller.ShippingAdress)
router.put('/Update/:id', controller.putOrderUser)
router.get('/InfoOrder/InfoOrderSuccsessfull', controller.InfoOrderSuccessful)

export default router