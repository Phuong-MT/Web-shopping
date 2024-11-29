import axiosConfig from '../axiosConfig'

export const apiPostOrder = (formData) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/order/`,
            data: formData
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apigetOrder = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/shopping-cart`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiDeleteOrder = (orderitemsId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/order/${orderitemsId}`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})