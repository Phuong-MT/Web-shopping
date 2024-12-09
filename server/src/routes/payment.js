import expess from 'express'
import * as controller from '../controllers/payment'

const router = expess.Router()
router.post('/checkout', controller.checkout)
export default router