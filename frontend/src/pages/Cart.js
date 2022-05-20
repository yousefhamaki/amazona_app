import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams, createSearchParams } from 'react-router-dom'
import {addToCart, removeFromCart} from "./../store/actions/CartAction"
import MessageBox from "./../components/default/MessageBox"
import { CartItemsComponent } from '../components/CartItems'

const Cart = (props) => {
    const {id} = useParams()
    const [searchParms] = useSearchParams()
    const qty = searchParms ? Number(searchParms.get("qty")) : 1
    const ProductId = id
    const cartSelector = useSelector(x=>x.Cart)
    const {cartItems} = cartSelector
    const navigate = useNavigate()
    //redux
    const dispatch = useDispatch()
    
    const checkOutHandler = ()=>{
      const params = {redirect: "shipping"}
      navigate({
        pathname: "/signin",
        search: `?${createSearchParams(params)}`
      })
    }
    useEffect(()=>{
        if(ProductId){
          dispatch(addToCart(ProductId, qty)) 
        }
    }, [dispatch, ProductId, qty])

    const removeFromHandler = (itemId)=>{
      //delete action
      dispatch(removeFromCart(itemId))
    }
  return (
    <div className='row top'>
       <div className='col-2'>
         <h1>Shopping Cart</h1>
         {
           cartItems.length === 0? (<MessageBox>
             Cart is empty <Link to="/">Go shopping</Link>
             </MessageBox>)
           : ( <CartItemsComponent cartItems={cartItems} qty /> )
           
         }
       </div>
       <div className='col-1'>
         <div className='card card-body'>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c)=> a + c.price.split("-")[0] * c.qty, 0).toFixed(2)}
              </h2>
            </li>
            <li>
              <button type='button' 
              onClick={checkOutHandler} 
              className="primary block" 
              disabled={cartItems.length ===0}>Proceed to checkout</button>
            </li>
          </ul>
         </div>
       </div>
    </div>
  )
}

export default Cart