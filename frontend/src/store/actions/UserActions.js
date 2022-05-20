import axios from "axios"
import { USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAILED, 
        USER_SIGNIN_REQUEST, 
        USER_SIGNIN_SUCCESS, 
        USER_SIGNOUT } from "../constants/UserConstants"

export const signIn = (email, password)=> async(dispatch)=>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: { email, password }})

    try{
        const {data} = await axios.post("/api/users/signin", {email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    }catch(err){
        dispatch({type: USER_SIGNIN_FAILED, payload: {
            message: err.response && err.response.data.message 
                ? err.response.data.message
                : err.message
        }})
    }
}

export const signOut = ()=>(dispatch)=>{
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    dispatch({type: USER_SIGNOUT})
}

export const register = (name, email, password)=> async (dispatch, setState)=>{
    dispatch({type: USER_REGISTER_REQUEST, payload:{name, email, password}})
    
    try{
        const {data} = await axios.post("/api/users/register", {name, email, password})
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
        setState().userSignIn = data
    }catch(err){
        dispatch({
            type: USER_REGISTER_FAILED,
            payload: {
                message: err.response && err.response.data.message 
                ? err.response.data.message
                : err.message
            }
        })
    }
}