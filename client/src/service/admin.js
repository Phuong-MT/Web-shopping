import axiosConfig from '../axiosConfig'

export const apiLoginAdmin = (payload) => new Promise(async (resolve, reject) => {
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

export const apiInfoUser = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url:'/api/v1/admin/infoUser'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiAdminGetproduct = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url:'/api/v1/admin/product'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})