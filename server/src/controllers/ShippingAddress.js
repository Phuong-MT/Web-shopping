import * as services from '../services/shippingaddress'

export const postShippingAddress = async(req, res) =>{
    const { id } = req.user
    if(!id){
        return res.status(401).json({
            err: -3,
            msg: 'Unauthorized: Missing user ID',
        });
    }
    const payload = req.body
    try {
        const response = await services.PostShippingAddressService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Faild at Order controller: '+error
        })
    }
} 