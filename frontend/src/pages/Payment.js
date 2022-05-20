import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../store/actions/CartAction'

const Payment = () => {
    const navigate = useNavigate()
    const cart = useSelector(state=> state.Cart)
    const {shippingAddress} = cart

    const [paymentMethod, setPayment] = useState("paypal")
    const dispatch = useDispatch()
    

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate({pathname: "/placeorder"})
    }
    useEffect(()=>{
        if(!shippingAddress.fullname){
            navigate({pathname: "/shipping"})
        }
    }, [shippingAddress, navigate])
  return (
    <div>
        <CheckoutSteps step1 step2 step3 />
        <form className='form' onSubmit={submitHandler}>
            <div>
                <h1>Payment method</h1>
            </div>
            <div>
                <div>
                    <input 
                        type="radio"
                        id="paypal"
                        value="paypal"
                        name="paymentMethod"
                        required
                        checked
                        onChange={e=> setPayment(e.target.value)}
                    />
                    <label htmlFor='paypal'>Paypal</label>
                </div>
                <br/>
                <div>
                    <input 
                        type="radio"
                        id="stripe"
                        value="stripe"
                        name="paymentMethod"
                        required
                        onChange={e=> setPayment(e.target.value)}
                    />
                    <label htmlFor='stripe'>Stripe</label>
                </div>
            </div>
            <div>
                <button className='primary' type='submit'>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default Payment