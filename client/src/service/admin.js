import axiosConfig from '../axiosConfig'

export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/admin/login',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})