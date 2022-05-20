import React from 'react'
import MessageBox from '../default/MessageBox'

const PaymentMethod = ({paymentMethod, isPaid, orderSaved, paidAt}) => {
  return (
    <div className='card card-body'>
        <h2>Payment</h2>
        <p>
            <strong>Method: </strong>{paymentMethod} <br/>
        </p>
        {isPaid ? <MessageBox varient="success">Delivered at {paidAt}</MessageBox> 
        : orderSaved && <MessageBox varient="danger">Not Paid</MessageBox>} 
    </div>
  )
}

export default PaymentMethod