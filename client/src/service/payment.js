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