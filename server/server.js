import express from 'express'
require("dotenv").config()
import cors from 'cors'
import initRoutes from './src/routes';
import connectdb from './src/config/connectDB';
import { deleteOrderService } from './src/services/Order';

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE','OPTIONS']
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

initRoutes(app)
connectdb()
const port = process.env.PORT|| 8888
const listener = app.listen(port, ()=>{
    console.log('Listening on port ' + listener.address().port)
})