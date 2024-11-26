import actionTypes from "./actionTypes";
import { apiGetProduct, apiGetProductQR} from "../../service/product";

export const getproduct = () => async (dispatch) =>{
    try {
        const response = await apiGetProduct()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCT,
                products: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCT,
                msg: response.data.msg
            })
        }
        
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT,
            products: null
        })
    }
}
export const getProductQR = (query) => async (dispatch) => {
    try {
        const response = await apiGetProductQR(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCT_QR,
                products: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCT_QR,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_QR,
            products: null
        })
    }
}