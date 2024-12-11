import expess from 'express'
import * as controller from '../controllers/payment'

const router = expess.Router()
router.post('/checkout', controller.checkout)
router.get('/amount',controller.exportPayments)
export default router