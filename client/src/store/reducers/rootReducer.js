import authReducer from "./authReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import productReducer from "./productReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";


const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token']
}
const adminConfig = {
    ...commonConfig,
    key: 'admin',
    whitelist: ['isAdmin', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    admin: persistReducer(adminConfig,adminReducer),
    user: userReducer,
    product: productReducer,
})

export default rootReducer