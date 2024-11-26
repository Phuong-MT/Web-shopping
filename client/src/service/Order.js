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