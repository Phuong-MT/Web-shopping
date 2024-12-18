import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
require('dotenv').config()

export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Admin.findOne({
            where: { phone },
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password)
        const token = isCorrectPassword && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Login is successfully !' : response ? 'Password is wrong !' : 'Phone number not found !',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})

export const InfoUser= () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.findAll({
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response? 0 : 1,
            msg: response? 'OK': 'Failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const GetproductServiceAdmin = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            raw: true,
            nest: true,
            include : [
                {
                    model: db.Category,as: 'category',
                    attributes: ['id','header', 'description']
                },
                {
                    model: db.ProductImage, as: 'images',
                    attributes: ['imageUrl','color']
                },
                {
                    model: db.Infoproduct, as: 'info',
                    attributes:['information','color','version'],
                }
            ],
            
            attributes: ['id', 'name', 'price', ],
       })
       resolve({
            err: response? 0 : 1,
            msg: response? 'OK': 'Failed',
            response
       })
    } catch (error) {
        reject(error)
    }
}) 