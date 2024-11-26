import { query, raw } from 'express'
import db from '../models'
import { where } from 'sequelize'
const { Op } = require("sequelize");
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

export const getProductQRSerivce = (query) => new Promise(async (resolve, reject) => {
    try {
        // attributes size not in db => block 
        const queries = { ...query }
        const value1 = Object.values(queries)[1] || '';
        const value2 = Object.values(queries)[2] === 'ASC' ? 'ASC' : 'DESC';
        const value3 = Object.values(queries)[3] || '';
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
                    // where: {
                    //     color: {
                    //       [Op.like]: `%${value1}%`,
                    //     },
                    //     version: {
                    //         [Op.like]:  `%${value3}%`
                    //       },
                    //   },
                 }
                
            ],
            order: [
            ['price',`${value2}`], // Sắp xếp theo price theo thứ tự tăng dần hoặc giảm dần (define = 'ASC')
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
