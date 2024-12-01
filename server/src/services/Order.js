import { response } from 'express'
import db from '../models'
import { Model } from 'sequelize';


export const postOrderService = (formData, userId) => new Promise(async (resolve, reject) => {
    try {
        const { name, productId, Size, quantity, price, imageUrl } = formData;
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
            orderId: newOrder.id,
            productname: name, // liên kết khóa ngoài
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
        const response = await db.Order.findAll({
            where:{userId: userId},
            include :[
                {model : db.OrderItem, as:'orderItem',
                   attributes:['id','productId','Size','quantity','price', 'totalPrice', 'imageUrl','productname'],
                }
            ],
            attributes: ['status','id'],
            order:[
                ['createdAt','DESC']
            ]
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

export const updateOrderService = (quantity, orderItemId) => new Promise(async(resolve, reject) => {
    const orderItem = await db.OrderItem.findOne({
        where: {id:orderItemId }
    })
    const total = orderItem.price * quantity
    try {
        const response = await db.OrderItem.update({
            quantity: quantity,
            totalPrice : total
        },{
            where:{id: orderItemId}
        })
        resolve({
            err: response !== null && response !== undefined ? 0 : 1,
            msg: 'OK',
        });
    } catch (error) {
        reject({
            err: -1,
            msg: 'Failed at updateOrderService: ' + error.message,
        });
    }
})

export const deleteOrderService = (orderitemsId) => new Promise(async (resolve, reject) => {
    try {
        // Tìm OrderItem bằng ID
        const order = await db.OrderItem.findByPk(orderitemsId);

        // Nếu không tìm thấy OrderItem
        if (!order) {
            return resolve({
                err: 1,
                msg: 'OrderItem not found.',
            });
        }

        // Lấy `orderId` từ OrderItem
        const value1 = order.orderId;

        // Xóa OrderItem dựa trên `orderitemsId`
        await db.OrderItem.destroy({
            where: { id: orderitemsId },
        });

        // Kiểm tra xem Order còn item nào không
        const remainingItems = await db.OrderItem.findAll({
            where: { orderId: value1 },
        });

        // Nếu không còn item nào, xóa Order
        let response = null;
        if (remainingItems.length === 0) {
            response = await db.Order.destroy({
                where: { id: value1 },
            });
        }

        // Trả về kết quả
        resolve({
            err: response !== null && response !== undefined ? 0 : 1,
            msg: 'OK',
        });
    } catch (error) {
        reject({
            err: -1,
            msg: 'Failed at deleteOrderService: ' + error.message,
        });
    }
});
