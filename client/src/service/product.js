import axiosConfig from '../axiosConfig'

export const apiGetProduct = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/product/all',    
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetProductQR = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/sort`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetProductLimit = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/product/limit/${postId}`,  
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetProductSreach = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/tim-kiem`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiPostCreateProduct =(formData) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url:'/api/v1/product/create/productId',
            data: formData
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 

export const apiDeleteProduct = (data) =>new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method :'post',
            url:'api/v1/product/delete/productId',
            data:data    
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiUpdateInfoProduct = (formData) =>new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url:'/api/v1/product/update/productId',
            data:formData
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})