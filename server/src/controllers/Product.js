import * as services from '../services/Product'

export const getProduct= async(req, res) =>{
    try {
        const response = await services.getProductSerivce()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Faild at category controller: '+error
        })
    }
} 