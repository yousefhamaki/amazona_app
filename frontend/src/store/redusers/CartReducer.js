import { CART_ADD_ITEM, 
    CART_EMPTY, 
    CART_REMOVE_ITEM, 
    CART_SAVE_PAYMENT_METHOD, 
    CART_SAVE_SHIPPING_ADDRESS } from "./../constants/CartConstants"

export const cartReducer = (state = {cartItems: []}, action)=>{
    switch(action.type){
        case CART_ADD_ITEM :
            const item = action.payload
            const existItem = state.cartItems[0]?  state.cartItems.find(x => x.id === item.id) : false
            const newcart = {...state, cartItems: [...state.cartItems, item]}
            
            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x=> x.id === existItem.id ? item : x)
                }
            }else{
                return newcart
            }
        case CART_REMOVE_ITEM :
            return {...state, cartItems: state.cartItems.filter(x=>x.id !== action.payload)}

        case CART_SAVE_SHIPPING_ADDRESS :
            return {...state, shippingAddress: action.payload}
        case CART_SAVE_PAYMENT_METHOD :
            return {...state, paymentMethod: action.payload}

        case CART_EMPTY :
            return {...state, cartItems: []}
        default : 
            return state
    }
}