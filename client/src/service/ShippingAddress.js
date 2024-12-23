import axiosConfig from '../axiosConfig'

export const apiShippingAddress = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/ShippingAddress/ShippingAddress',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})