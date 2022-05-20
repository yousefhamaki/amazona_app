import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {signIn} from "./../store/actions/UserActions"
import LoadingBox from "./../components/default/LoadingBox"
import MessageBox from './../components/default/MessageBox'

const Signin = () => {
    const [email, setEmail] = useState()
    const [password, setPass] = useState()

    const [searchParms] = useSearchParams()
    const redirect = searchParms.get("redirect") ? "/" + searchParms.get("redirect") : "/"

    const userSignIn = useSelector(state=>state.userSignIn)
    const {userInfo, loading, error} = userSignIn

    const navigation = useNavigate()

    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(signIn(email, password))
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
                <h1>Sign In</h1>
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
                <button className='primary' type='submit'>Sign In</button>
            </div>
            <div>
                New Customer? <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
            </div>
        </form>
    </div>
  )
}

export default Signin