import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {PayPalButton} from "react-paypal-button-v2"
import { useParams } from 'react-router-dom'
import { detailsOrder, payOrder } from '../store/actions/OrderAction'
import LoadingBox from "./../components/default/LoadingBox"
import ErrorBox from "./../components/default/ErrorBox"
import OrderDetails from '../components/order/OrderDetails'
import axios from 'axios'
import MessageBox from '../components/default/MessageBox'

const Order = (props) => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const {order, error, loading} = orderDetails
  const [sdk, setSdk] = useState(false)

  const tax = 37.5
  const priceItems = order && order.orderItems.reduce((a, c)=> a + c.price.split("-")[0] * c.qty, 0)
  const shipping = order && priceItems < 100 ? 10 : 0
  const totalPrice = order && priceItems + tax + shipping

  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: successPay, error: errorPay} = orderPay
  
  useEffect(()=>{
    const PaypalScript = async()=>{
      const {data} = await axios.get("/api/config/paypal")
      console.log(data)
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
      script.async = true
      script.onload = ()=>{
        setSdk(true)
      }
      document.body.appendChild(script)
    }

    if(!order || successPay || (order && order._id !== id)){
      dispatch(detailsOrder(id))
    }else{
      if(!order.isPaid){
        if(!window.paypal){
          PaypalScript()
        }else{
          setSdk(true)
        }
      }
    }
    
  }, [dispatch, order, successPay, setSdk, id])

  const successPaymentHandler = (paymentResult)=>{
    console.log("paid")
    dispatch(payOrder(order, paymentResult))
  }
  return loading ? (<LoadingBox />)
    : error ? (<ErrorBox>error</ErrorBox>)
    :order && (
    <div>
        <h2>Order: {id}</h2>
        <div className='row top'>
          <OrderDetails 
            shpping={order.shippingAddress} 
            paymentMethod={order.paymentMethod}
            isDelivered = {order.isDelivered}
            isPaid={order.isPaid}
            orders={order.orderItems}
            orderSaved="true"
            />

          <div className='col-1'>
            <div className='card card-body'>
                <h1>Order Summary</h1>
            <ul>
              <li className='row'>
                <div>Items Number</div>
                <div>{order.orderItems.reduce((a, c) => a + c.qty, 0)}</div>
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
              <li className='row'>
                {
                  !sdk ?(
                    <LoadingBox />
                  ):(
                    <>
                    {errorPay && (
                      <MessageBox varient="danger">{errorPay}</MessageBox>
                    )}

                    {loadingPay && (<LoadingBox />)}
                    <PayPalButton 
                    amount={totalPrice.toFixed(2)}
                    onSuccess={successPaymentHandler} />
                    </>
                  )
                }
              </li>
            </ul>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Order