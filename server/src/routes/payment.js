import expess from 'express'
import * as controller from '../controllers/payment'
import verifyToken from '../middlewares/verifyToken'

const router = expess.Router()
router.post('/checkout', controller.checkout)
router.get('/amount',controller.exportPayments)
router.get('/:sessionId', controller.paymentIntentId)
export default router