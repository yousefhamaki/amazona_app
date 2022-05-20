import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Product from "./../components/product";
import { listProducts } from '../store/actions/ProductActions';
//default
import LoadingBox from "./../components/default/LoadingBox"
import MessagBox from '../components/default/MessageBox';

const Home = () => {
  const dispatch = useDispatch()
  const productlist = useSelector(state => state.productList)
  const {loading, error, products} = productlist;

  useEffect(()=>{
    dispatch(listProducts());
  }, [dispatch])

  return (
    <div>
      {
        loading? <LoadingBox /> :
        error? <MessagBox varient="danger" message={error} /> :
        (
          <div className="row center">
              {
                  products.map(product=>(
                      <Product key={product._id} product={product} />
                  ))
              }
          </div>
        )
      }
      
    </div>
    
  )
}

export default Home