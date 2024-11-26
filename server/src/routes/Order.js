import expess from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as controller from '../controllers/Order'

const router = expess.Router()
router.use(verifyToken)
router.post('/', controller.postOrder)

export default router