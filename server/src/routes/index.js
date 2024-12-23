import authRoute from './auth'
import categoryRoute from './category'
import prodcutRoute from './Product'
import userRouter from './user'
import orderRoute from './Order'
import adminRoute from './admin'
import paymentRoute from './payment'
import shippingAddressRoute from './ShippingAddress'
const initRoutes = (app) =>{
    
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/category', categoryRoute)
    app.use('/api/v1/product', prodcutRoute)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/order', orderRoute)
    app.use('/api/v1/admin', adminRoute)
    app.use('/api/v1/payment', paymentRoute)
    app.use('/api/v1/ShippingAddress', shippingAddressRoute)
    return app.use( '/', (req, res)=>{
        res.send('server on...')
    })
}

export default initRoutes