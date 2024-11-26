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

