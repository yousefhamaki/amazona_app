import React from 'react'
import InStock from './InStock'



const CardBody = ({qty, price, stock, setqty, id}) => {
  return (
    <div className='card card-body'>
        <ul>
            <li>
                <div className='row'>
                    <div className='title'>Price</div>
                        <div className='price'>$ {price}</div>
                </div>
            </li>
            <li>
                <div className='row'>
                    <div className='title'>status</div>
                    <div>{stock > 0 ?
                        <span className='success'>In stock</span> : 
                        <span className='danger'>Unavailable</span>}</div>
                    </div>
            </li>
                {
                    stock > 0 &&(
                        <>
                            <InStock id={id} setqty={setqty} qty={qty} stock={stock} />
                        </>    
                  )
                        
                }           
        </ul>
    </div>
  )
}

export default CardBody