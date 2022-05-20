import React from 'react'
import { CartItemsComponent } from '../CartItems'
import Address from './Address'
import PaymentMethod from './PaymentMethod'

const OrderDetails = ({shpping, paymentMethod, orders, isPaid, isDelivered, orderSaved}) => {
  return (
    <div className='col-2'>
        <ul>
            <li>
                <Address shipping={shpping} isDelivered={isDelivered} orderSaved={orderSaved} />
            </li>

            <li>
                <PaymentMethod paymentMethod={paymentMethod} isPaid={isPaid} orderSaved={orderSaved} />
            </li>

            <li>
                <div className='card card-body'>
                    <h2>OrderItems</h2>
                    <CartItemsComponent cartItems={orders} />
                </div>
            </li>
        </ul>
    </div>
  )
}

export default OrderDetails