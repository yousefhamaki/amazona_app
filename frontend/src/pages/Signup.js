import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {register} from "./../store/actions/UserActions"
import LoadingBox from "./../components/default/LoadingBox"
import MessageBox from './../components/default/MessageBox'

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
    const [password, setPass] = useState()

    const [searchParms] = useSearchParams()
    const redirect = searchParms.get("redirect") ? "/" + searchParms.get("redirect") : "/"

    const userSignIn = useSelector(state=>state.userRegister)
    const {userInfo, loading, error} = userSignIn

    const navigation = useNavigate()

    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(register(name, email, password))
    }

    useEffect(()=>{
      if(userInfo){
          navigation({pathname: redirect})
      }
  }, [userInfo, navigation, redirect])

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
          <div>
              <h1>Register</h1>
          </div>
          {
          loading && <LoadingBox />}

          {error && <MessageBox varient="danger">{error.message}</MessageBox>
          }
          <div>
              <label htmlFor='email'>Email address</label>
              <input 
              type="email" 
              id='email' 
              placeholder='Enter email' 
              required 
              onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
              <label htmlFor='name'>Name</label>
              <input 
              type="text" 
              id='name' 
              placeholder='Enter your name' 
              required 
              onChange={e=>setName(e.target.value)} />
          </div>
          <div>
              <label htmlFor='password'>Password</label>
              <input 
              type="password" 
              id='password' 
              placeholder='Enter password' 
              required 
              onChange={e=>setPass(e.target.value)} />
          </div>

          <div>
              <label></label>
              <button className='primary' type='submit'>Sign up</button>
          </div>
          <div>
              New Customer? <Link to="/signin">Sign in</Link>
          </div>
      </form>
  </div>
  )
}

export default Signup