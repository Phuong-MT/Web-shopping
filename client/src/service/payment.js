import axiosConfig from '../axiosConfig'

export const apiCheckout = (total) =>new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/payment/checkout`,
            data: total
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAmount = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/payment/amount',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apipaymentIntentId = (sessionId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/payment/${sessionId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiRefundPayment = (postalCode) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url : `api/v1/payment/refund/${postalCode}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})