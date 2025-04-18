import * as services from '../services/Product'

export const getProduct= async(req, res) =>{
    try {
        const response = await services.getProductSerivce()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Faild at product controller: '+error
        })
    }
} 
export const getProductQR= async(req, res) =>{
    try {
        const {...query} = req.query
        const response = await services.getProductQRSerivce(query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg: 'Faild at product controller: '+error
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
            msg: 'Failed at product controller: ' + error
        });
    }
}
export const getProductSreach = async(req,res) =>{
    try {
        const { category, price, size, color, upgrade } = req.query;
        const response = await services.getProductSreachService(req.query)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at product controller: ' + error
        });
    }
}

export const PostCreatePorduct = async(req, res) =>{
    const {
        productName,
        productDescription,
        productPrice,
        productCategoryId,
        productimageUrl,
        productColorUrl,
        productInformation,
        productColor,
        productVersion
    } = req.body
    if( !productName|| !productDescription || !productPrice || !productCategoryId || !productimageUrl
        || !productColorUrl|| !productInformation|| !productColor|| !productVersion){
        console.log('error')
        return res.status(400).json({
            err: 1,
            msg: 'faild post info product to create product '
        });
    }
    try {
        const response = await services.createProduct(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at product controller: ' + error
        });
    }
}

export const PostDeleteProduct = async(req, res) =>{
    const  products  = req.body;
    if(!products){
        return res.status(400).json({
            err: 1,
            msg: 'faild post info product to create product '
        });
    }
    try {
        const response = await services.DeleteProduct(products)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at product controller: ' + error
        });
    }
} 