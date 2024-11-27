import { response } from 'express'
import db from '../models'
import { Model } from 'sequelize';

//GET ALL CATEGORY
export const postOrderService = (formData, userId) => new Promise(async (resolve, reject) => {
    try {
        const { productId, Size, quantity, price, imageUrl } = formData;
        const totalPrice = price * quantity;
        const newOrder  = await db.Order.create({
            userId: userId,
            status: 'wait',  
        })
        const response = await db.OrderItem.create ({
            productId : productId,
            Size: Size,
            quantity: quantity,
            price: price,
            totalPrice: totalPrice,
            imageUrl: imageUrl,
            orderId: newOrder.id, // liên kết khóa ngoài
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to post Order.',
            response: response
        })
    } catch (error) {
        reject(error)
    }
})

export const getOrderService = (userId) => new Promise(async (resolve, reject) => {
    try {
        console.log(userId)
        const response = await db.Order.findAll({
            where:{userId: userId},
            include :[
                {model : db.OrderItem, as:'orderItem',
                   attributes:['productId','Size','quantity','price', 'totalPrice', 'imageUrl'],
                }
            ],
            attributes: ['status']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Order.',
            response: response
        })
    } catch (error) {
        reject(error)
    }
})