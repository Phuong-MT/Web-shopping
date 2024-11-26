import * as services from '../services/Order'

export const postOrder = async(req, res) =>{
    const { id } = req.user
    if(!id){
        return res.status(401).json({
            err: -3,
            msg: 'Unauthorized: Missing user ID',
        });
    }
    const {...formData} = req.body
    try {
        const response = await services.postOrderService(formData, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Faild at Order controller: '+error
        })
    }
} 