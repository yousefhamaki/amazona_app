import { CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/OrderConstants";

export const orderCreateReduser = (state = {}, action)=>{
    switch(action.type){
        case CREATE_ORDER_REQUEST :
            return {loading: true}
        case CREATE_ORDER_SUCCESS: 
            return {loading: false, success: true, order: action.payload}
        case CREATE_ORDER_ERROR :
            return {loading: false, error: action.payload}
        case CREATE_ORDER_RESET :
            return {}
        default:
            return state
    }
}

export const orderDetailsReduser = (state = {}, action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST :
            return {loading: true}
        case ORDER_DETAILS_SUCCESS :
            return {loading: false, order: action.payload}
        case ORDER_DETAILS_FAILED :
            return {loading: false, error: action.payload}
        default :
        return state
    }
}

export const orderPayReduser = (state = {}, action)=>{
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading: true}
        case ORDER_PAY_SUCCESS :
            return {loading: false, success: true}   
        case ORDER_PAY_FAILED :
            return {loading: false, error: action.payload}
        default :
            return state
    }
}