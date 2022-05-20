import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../store/actions/UserActions'

const Header = () => {
  const cart = useSelector(state=>state.Cart)
  const UserInfo = useSelector(state=>state.userSignIn)
  const {userInfo} = UserInfo

  const {cartItems} = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signOutHandler = ()=>{
    dispatch(signOut())
    navigate({pathname: "/"})

  }

  return (
    <header className="row">
        <div>
            <Link className="brand" to="/">amazon</Link>
        </div>
        <div>
          <Link to="/cart" className='relative'>
            <i className="fa-solid fa-cart-shopping"></i> 
            {
              cartItems.length > 0 && (
                <span className='badge'>{ cartItems.length }</span>
              )
            }
          </Link>
          {
            userInfo ? (
              <div className='dropdown'>
                <Link to="/#">{userInfo.name} <i className='fa fa-caret-down'></i> </Link>
                <ul className='dropdown-content'>
                  <Link to="#logout" onClick={signOutHandler}>
                    Sign out
                  </Link>
                </ul>
              </div>
            ):(
              <Link to="/signin">Sign In</Link>
            )
          }
        </div>
    </header>
  )
}

export default Header