import React from 'react'
import { useDispatch } from 'react-redux'
import {addToCart, removeFromCart} from "./../store/actions/CartAction"
import { Link } from 'react-router-dom'

export const CartItemsComponent = ({cartItems, qty}) => {

    const dispatch = useDispatch()

    const removeFromHandler = (itemId)=>{
        //delete action
        dispatch(removeFromCart(itemId))
      }
  return (
    <ul>
        {
               cartItems.map((item)=>(
                  <li className='row' key={item.id}>
                    <div className='row'>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div className='min-30'>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </div>
                    {qty ? 
                        <>
                        <select value={item.qty} onChange={e=>dispatch(addToCart(item.id, Number(e.target.value)))}>
                        {
                            [...Array(item.countInStock).keys()].map(
                            x => (
                                <option key={x+1} value={x + 1}>{x+1}</option>
                            )
                            )
                        }
                        </select>
                        <div>$ {item.price ? (item.price.split("-")[0] * item.qty).toFixed(2) : 0 }</div>
                        <div>
                            <button type='button' onClick={()=>removeFromHandler(item.id)}>Delete</button>
                        </div>
                        </>
                     : 
                    <div>
                        {item.qty} * {item.price ? item.price.split("-")[0] : 0} =
                        $ {item.price ? (item.price.split("-")[0] * item.qty).toFixed(2) : 0 }
                    
                    </div>}
                    
                  </li>
                ))
             }
    </ul>
  )
}
