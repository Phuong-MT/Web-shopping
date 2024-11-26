import { response } from 'express'
import db from '../models'

//GET ALL CATEGORY
export const postOrderService = (formData, userId) => new Promise(async (resolve, reject) => {
    try {
        const { productId, Size, quantity, price } = formData;
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
            orderId: newOrder.id, // liên kết khóa ngoài
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get categories.',
            response: response
        })
    } catch (error) {
        reject(error)
    }
})