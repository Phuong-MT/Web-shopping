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