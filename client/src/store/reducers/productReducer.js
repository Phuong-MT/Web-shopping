import actionTypes from "../actions/actionTypes";
const initState = {
    products: [],
    msg: '',
    count: 0
}

const productReducer = (state = initState, action) => {
    switch (action.type){
        case actionTypes.GET_PRODUCT:
        case actionTypes.GET_PRODUCT_QR:
            return {
                ...state,
                products: action.products || [],
                msg: action.msg || '',
                count: action.count || 0
            }
            break;

        default:
            return state;
    }
}

export default productReducer
