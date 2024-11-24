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
export const getProductLimit = async (req, res) => {
    try {
        const { postId } = req.params;  // Lấy từ params
        if (!postId) {
            return res.status(400).json({
                err: 1,
                msg: 'postId is required'
            });
        }
        const response = await services.getProductLimitSerivce(postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        });
    }
}
