import React from 'react'
import MessageBox from "./../default/MessageBox"

const Address = ({shipping, isDelivered, delieveredAt, orderSaved}) => {
  return (
    <div className='card card-body'>
        <h2>Shipping</h2>
        <p>
            <strong>Name: </strong>{shipping.fullname} <br/>
            <strong>Address: </strong>{shipping.address} 
            , {shipping.city}, {shipping.country}<br/>
            <strong>Postal Code: </strong>{shipping.postalCode} <br/>
            <strong>Phone: </strong>{shipping.phone} <br/>
        </p>
        {
        isDelivered ? <MessageBox varient="success">Delivered at {delieveredAt}</MessageBox> 
        : orderSaved && <MessageBox varient="danger">Not Delivered</MessageBox> 
        }

    </div>
  )
}

export default Address