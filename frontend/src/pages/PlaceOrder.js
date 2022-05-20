import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CartItemsComponent } from '../components/CartItems'
import { createOrder } from '../store/actions/OrderAction'
import LoadingBox from "./../components/default/LoadingBox"
import ErrorBox from "./../components/default/ErrorBox"
import Address from '../components/order/Address'
import PaymentMethod from '../components/order/PaymentMethod'
import OrderDetails from '../components/order/OrderDetails'


const PlaceOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, error, success, order} = useSelector(state =>state.orderCreate)

  const cart = useSelector(state => state.Cart)
  const {shippingAddress, paymentMethod, cartItems} = cart
  const tax = 37.5
  const priceItems = cartItems.reduce((a, c)=> a + c.price.split("-")[0] * c.qty, 0)
  const shipping = priceItems < 100 ? 10 : 0
  const totalPrice = (priceItems + tax) + shipping

  const checkOutHandler = ()=>{
    dispatch(createOrder({...cart, orderItems: cartItems}))
  }

  useEffect(()=>{
    //added
    if(success){
      navigate({pathname: `/order/${order.order._id}`})
    }

    //shipping
    if(!shippingAddress.fullname){
      navigate({pathname: "/shipping"})
  }
    if(!paymentMethod){
      navigate({pathname: "/payment"})
  }
}, [success, order, navigate, shippingAddress, paymentMethod])
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <div className='row top'>
          <OrderDetails 
            shpping={shippingAddress} 
            paymentMethod={paymentMethod}
            orders={cartItems}
            />

          <div className='col-1'>
            <div className='card card-body'>
                <h1>Order Summary</h1>
            <ul>
              <li className='row'>
                <div>Items Number</div>
                <div>{cartItems.reduce((a, c) => a + c.qty, 0)}</div>
              </li>

              <li className='row'>
                <div>Items Price</div>
                <div>{priceItems.toFixed(2)} $</div>
              </li>

              <li className='row'>
                <div>Shipping Address</div>
                <div>{shipping.toFixed(2)} $</div>
              </li>

              <li className='row'>
                <div>Tax</div>
                <div>{tax.toFixed(2)} $</div>
              </li>

              <li className='row bold'>
                <div>Order Total</div>
                <div>{totalPrice.toFixed(2)} $</div>
              </li>

              <li>
                <button type='button' 
                onClick={checkOutHandler} 
                className="primary block" 
                disabled={cartItems.length ===0}>{loading && <LoadingBox />} place order</button>
              </li>
              {error && <ErrorBox>error</ErrorBox>}
            </ul>
          </div>
          </div>
        </div>
    </div>
  )
}

export default PlaceOrder