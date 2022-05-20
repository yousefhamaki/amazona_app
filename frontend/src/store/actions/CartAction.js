import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "./../constants/CartConstants"

export const addToCart = (ProductId, qty) => async(disPatch, getState)=>{
    const {data} = await axios.get(`/api/products/${ProductId}`)

    disPatch({
        type: CART_ADD_ITEM,
        payload: {
            id: data._id,
            name: data.title,
            image: data.images_list[0],
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems))
}

export const removeFromCart = (ProductId) => (disPatch, getState)=>{
    disPatch({
        type: CART_REMOVE_ITEM,
        payload: ProductId
    })
    
    localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems))
}

export const saveShippingAddress = (data) => async (disPatch)=>{
    disPatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (disPatch)=>{
    disPatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
}