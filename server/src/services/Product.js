import { query, raw } from 'express'
import db from '../models'
import { where } from 'sequelize'

//GET ALL CATEGORY
export const getProductSerivce = () => new Promise(async (resolve, reject) => {
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
                }
            ],
            
            attributes: ['id', 'name', 'price', ],
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get categories.',
            response
        })
    } catch (error) {
        reject(error)
    }
})
export const getProductLimitSerivce = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findOne({
            raw: true,
            nest: true,
            include : [
                {
                    model: db.ProductImage, as: 'images',
                    attributes: ['imageUrl','color']
                },
                {
                    model: db.Infoproduct, as: 'info',
                    attributes:['information','color']
                }
            ],
            where: {id: postId},
            attributes: ['id', 'name', 'price', ]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get.',
            response 
        })
    } catch (error) {
        reject(error)
    }
})
