import authRoute from './auth'
import categoryRoute from './category'
import prodcutRoute from './Product'
import userRouter from './user'
const initRoutes = (app) =>{
    
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/category', categoryRoute)
    app.use('/api/v1/product', prodcutRoute)
    app.use('/api/v1/user', userRouter)
    return app.use( '/', (req, res)=>{
        res.send('server on...')
    })
}

export default initRoutes