import { USER_REGISTER_FAILED, USER_REGISTER_REQUEST, 
        USER_REGISTER_SUCCESS, 
        USER_SIGNIN_FAILED, 
        USER_SIGNIN_REQUEST,
         USER_SIGNIN_SUCCESS, 
         USER_SIGNOUT } from "../constants/UserConstants";

export const SignInReduser = (state={}, action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST || USER_REGISTER_REQUEST :
            return {loading: true}
        case USER_SIGNIN_FAILED || USER_REGISTER_FAILED : 
            return {loading: false, error: action.payload}
        case USER_SIGNIN_SUCCESS || USER_REGISTER_SUCCESS :
            return {loading: false, userInfo: action.payload}
        case USER_SIGNOUT: 
            return {}
        default:
        return state
    }
}

export const RegisterReduser = (state={}, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST :
            return {loading: true}
        case USER_REGISTER_FAILED : 
            return {loading: false, error: action.payload}
        case USER_REGISTER_SUCCESS :
            return {loading: false, userInfo: action.payload}
        case USER_SIGNOUT: 
            return {}
        default:
        return state
    }
}