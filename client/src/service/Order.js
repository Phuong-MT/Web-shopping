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
export const apiUpdateOrder = (quantity, orderId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/order/${orderId}`,
            data: quantity
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
export const apigetShippingAddress = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/${id}`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiputOrderUser = (postalCode) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/order/Update/${postalCode}`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export  const apigetInfoOrderSuccessful = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/InfoOrder/InfoOrderSuccsessfull`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apigetInforOrderAdmin = () =>new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/InfoOrder/OrderInAdmin`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})