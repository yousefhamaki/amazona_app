import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingBox from '../components/default/LoadingBox'
import MessageBox from '../components/default/MessageBox'
import Rating from '../components/Rating'
import { detailsProduct } from '../store/actions/ProductActions'
import {useDispatch, useSelector} from "react-redux"
import InsertImages from '../components/product/InsertImages'

import CardBody from '../components/product/CardBody'

export default function Product(props){
    const {id} = useParams()

    const dispatch = useDispatch()
    const productDetails = useSelector(x=> x.productDetails)
    const {product, error, loading} = productDetails
    const [qty, setqty]= useState(1)
    const [active, setActive] = useState(false)
    const [x, setx]= useState(0)
    const [y, sety]= useState(0)
    const [screenx, setscreenx]= useState(0)
    const [screeny, setscreeny]= useState(0)
    const [show, setShow]= useState("")
    const element = useRef()

    const active_image = el=>{
        setActive(el)
    }
    const getPosition = e=>{
        const el = element.current.getBoundingClientRect()
        setx(e.clientX - el.left)
        sety(e.clientY - el.top)
        setscreenx(e.clientX)
        setscreeny(e.clientY)
        setShow("show")
    }
    const hideel = e=>{
        setShow("")
    }

    
    useEffect(()=>{
        dispatch(detailsProduct(id))
    }, [dispatch, id])
 
  return (
    <div>
    {
      loading? <LoadingBox /> :
      error? <MessageBox varient="danger" message={error} /> :
      (
        <div>
        <Link to="/">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            <span> Back to result</span>
        </Link>
        <div className='row top'>
            <div className='col-2 content-center row start'>
                <InsertImages active_image={active_image} images={product.images_list} />
                <div>
                    <div className={`lenth ${show}`} 
                    style={{ 
                        backgroundImage: `url(${active|| product.images_list[0]})`,
                        backgroundSize: `${(active.width * 5) + "px " + (active.height * 5) + "px"}`,
                        backgroundPosition: `-${(x * 2) }px -${(y * 2)}px`, 
                        backgroundRepeat: "no-repeat",
                        position: 'absolute',
                        top: screeny - (y / 2),
                        right: screenx - (x / 2),
                        // top: "250px",
                        // right: "20px",
                     }}></div>
                    <img ref={element} 
                    onMouseLeave={e=>hideel()} 
                    onTouchCancel={e=>hideel()}
                    onTouchMove={e=>getPosition(e)} 
                    onMouseMove={e=>getPosition(e)} 
                    className='medium border' 
                    src={active || product.images_list[0]} 
                    alt={product.name} />
                </div>
            </div>
            <div className='col-1'>
                <ul>
                    <li>
                        <h1>{ product.title }</h1>
                    </li>
                    <li>
                        <Rating rating={product.rating} numReviews={product.numReviews} />
                    </li>
                    <li>
                        Price: {product.price.split("-")[0]}
                    </li>
                    <li>
                        Description: {product.product_details}
                    </li>
                </ul>
            </div>
            <div className='col-1'>
                <CardBody id={id} 
                qty={qty} 
                price={product.price.split("-")[0]} 
                setqty={setqty} 
                stock={product.countInStock} />
            </div>
        </div>
        </div>
      )
    }
    
  </div>
  )
}

// export default Product