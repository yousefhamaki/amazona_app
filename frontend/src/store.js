import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { productDetailsProduser, productListProduser } from "./store/redusers/ProductListProduser"
import {cartReducer} from "./store/redusers/CartReducer"
import thunk  from "redux-thunk"
import { RegisterReduser, SignInReduser } from "./store/redusers/UserReduser"
import { orderCreateReduser, orderDetailsReduser, orderPayReduser } from "./store/redusers/OrderReduser"
const initstate = {
    Cart: {
        cartItems: localStorage.getItem("cartItems")? 
        JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingAddress: localStorage.getItem("shippingAddress")? 
        JSON.parse(localStorage.getItem("shippingAddress")) : {},
        paymentMethod: "paypal"
    },
    userSignIn: {
        userInfo: localStorage.getItem("userInfo")? 
        JSON.parse(localStorage.getItem("userInfo")) : null
    }
}

const reduser = combineReducers({
    productList: productListProduser,
    productDetails: productDetailsProduser,
    Cart: cartReducer,
    userSignIn: SignInReduser,
    userRegister: RegisterReduser,
    orderCreate: orderCreateReduser,
    orderDetails: orderDetailsReduser,
    orderPay: orderPayReduser,
})

const composeEnhanker = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reduser, initstate,
    composeEnhanker(applyMiddleware(thunk))
    )

export default store