import { query, raw } from 'express'
import db from '../models'
import { where } from 'sequelize'
const { Op } = require("sequelize");
const {sequelize} = require('../models')
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
                    where: {
                        color: {
                          [Op.like]: `%${value1}%`,
                        },
                        version: {
                            [Op.like]:  `%${value3}%`
                          },
                      },
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
export const getProductSreachService = (query) => new Promise(async(resolve, reject) => {
    try {
        const {category, color, gender} = query
        const Gender = gender == 'orther' ? '' :gender
        const response =  await db.Product.findAll({
            raw: true,
            nest: true,
            where:{
                name :{
                    [Op.like]: `%${category}%`,
                }
            },
            include:[
                {
                    model: db.ProductImage, as: 'images',
                    attributes: ['imageUrl','color']
                },
                {
                    model: db.Category,as: 'category',
                    attributes: ['header'],
                    where:{
                        header :{
                            [Op.like]: `%${Gender}%`,
                        }
                    }

                }, 
                {
                    model: db.Infoproduct, as: 'info',
                    attributes:['information','color'],
                    where:{
                        color :{
                            [Op.like]: `%${color}%`,
                        }
                    },
                },
            ],
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

export const createProduct = (data) => new Promise(async(resolve, reject) => {
    const {
    productName,
    productDescription,
    productPrice,
    productCategoryId,
    productimageUrl,
    productColorUrl,
    productInformation,
    productColor,
    productVersion
    } = {...data}
    const t = await sequelize.transaction();
    try {
        const product = await db.Product.create({
            name: productName,
            description: productDescription, 
            price: productPrice,
            categoryId: productCategoryId
        },{transaction: t})
        await db.ProductImage.create({
            productId: product.id,
            imageUrl: productimageUrl,
            color: productColorUrl,
        })
        await db.Infoproduct.create({
            productId: product.id,
            information: productInformation,
            color: productColor,
            version: productVersion,    
        })
        await t.commit();
        console.log('Post created successfully!');
        resolve({
            err: product ? '0':'1',
            msg: product ? 'Ok' : 'Failed to create product', 
        })
    } catch (error) {
        await t.rollback();
        reject(error)
    }
})  

export const DeleteProduct = (products) => new Promise(async(resolve, reject) => {
    const productIds = products.map((product) => product.id)
    const t = await sequelize.transaction();
    try {
        const response = await db.Product.destroy({
            where: { id: productIds },
            transaction: t,
          });
          await db.ProductImage.destroy({
            where: { productId: productIds }, // Giả sử Image có productId là khóa ngoại
            transaction: t,
          });
          await db.Infoproduct.destroy({
            where: { productId: productIds }, // Giả sử Image có productId là khóa ngoại
            transaction: t,
          }); 
          await t.commit();
          console.log('Post delete product successfully!');
          resolve({
            err: response ? '0':'1',
            msg: response ? 'Ok' : 'Failed to create product', 
        })
    } catch (error) {
        reject(error)
    }
})