import axios from "axios"
import { CART_EMPTY } from "../constants/CartConstants"
import { CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/OrderConstants"

export const createOrder = (order)=>async (dispatch, getState)=>{
    dispatch({type: CREATE_ORDER_REQUEST, payload: order})

    try{
        const {userSignIn: {userInfo}} = getState()
        const {data} = await axios.post("/api/orders/", order, {
            headers: {
                Authorization: `Hamaki ${userInfo.token}`
            }
        })
        dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
        dispatch({type: CART_EMPTY})
        localStorage.removeItem("cartItems")
    }catch(err){
        dispatch({type: CREATE_ORDER_ERROR, 
            payload: err.response && err.response.data.message ? 
            err.response.data.message 
            : err.message})
    }
}

export const detailsOrder = (id)=>async (dispatch, getState)=>{
    dispatch({type: ORDER_DETAILS_REQUEST, payload: id})

    try{
        const {userSignIn: {userInfo}} = getState()
        const {data} = await axios.post(`/api/orders/${id}`, id, {
                headers: {
                    Authorization: `Hamaki ${userInfo.token}`
                }
            })
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
    }catch(err){
        const message = err.response && err.response.data.message ?
                err.response.data.message
                : err.response.message
        dispatch({type: ORDER_DETAILS_FAILED, payload: message})

    }
}

export const payOrder = (order, paymentResult) =>async (dispatch, getState)=>{
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}})

    const {userSignIn: {userInfo}} = getState()
    try{
        const {data} = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: {
                Authorization: `Hamaki ${userInfo.token}`
            }
        })

        dispatch({type: ORDER_PAY_SUCCESS, payload: data})
    }catch(err){
const message = err.response && err.response.data.message ?
                err.response.data.message
                : err.response.message
        dispatch({type: ORDER_PAY_FAILED, payload: message})
    }
}