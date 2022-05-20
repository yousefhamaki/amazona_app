import React from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'

const InStock = ({stock, setqty, qty, id}) => {
    const navigate = useNavigate()

    const addToCardHandler = ()=>{
        const params = {qty: qty}
        navigate({
            pathname: `/cart/${id}`,
            search: `?${createSearchParams(params)}`
        })
    }
  return (
    <>
        <li>
            <div className='row'>
                <div className='title'>
                    quantity : 
                </div>
                <div>
                    <select value={qty} onChange={e=>setqty(e.target.value)}>
                        {
                            [...Array(stock).keys()].map(
                                x => (
                                    <option key={x+1} value={x + 1}>{x+1}</option>
                                )
                            )
                        }
                    </select>
                </div>
            </div>
            
        </li>
        <li>
            <button onClick={addToCardHandler} className='primary block'>Add to cart</button>
        </li>
    </>
  )
}

export default InStock