import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../store/actions/CartAction'

const ShippingAddress = () => {
    const navigation = useNavigate()
    const userSignin = useSelector(state => state.userSignIn)
    const {userInfo} = userSignin

    const cart = useSelector(state => state.Cart)
    const {shippingAddress} = cart

    const [fullname, setFullname] = useState(shippingAddress.fullname)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [phone, setPhone] = useState(shippingAddress.phone)

    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({fullname, address, city, country, postalCode, phone}))

        navigation({pathname: "/payment"})
    }
    useEffect(()=>{
        if(!userInfo){
            navigation({pathname: "/signin"})
        }
    }, [userInfo, navigation])
  return (
    <div>
        <CheckoutSteps step1 step2 />
        <form className='form' onSubmit={submitHandler}>
            <div>
                <h1>Shipping Address</h1>
            </div>
            <div>
                <label htmlFor='fullname'>Full Name</label>
                <input 
                    type="text"
                    id="fullname"
                    placeholder="Enter full name"
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    required
                />
                    
            </div>

            <div>
                <label htmlFor='address'>Address</label>
                <input 
                    type="text"
                    id="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                />
                    
            </div>

            <div>
                <label htmlFor='city'>City</label>
                <input 
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                />
                    
            </div>

            <div>
                <label htmlFor='postal'>Postal Code</label>
                <input 
                    type="text"
                    id="postal"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    required
                />
                    
            </div>

            <div>
                <label htmlFor='phone'>Phone</label>
                <input 
                    type="number"
                    id="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />
                    
            </div>

            <div>
                <label htmlFor='country'>Country</label>
                <input 
                    type="text"
                    id="country"
                    placeholder="Enter Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    required
                />
                    
            </div>

            <div>
                <label />
                <button className='primary' type='submit'>Continue</button>
            </div>

        </form>
    </div>
  )
}

export default ShippingAddress