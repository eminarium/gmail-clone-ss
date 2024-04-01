import React from 'react'
import gmail_icon from './images/gmail_icon.png'
import "./Login.css"
import { Button } from '@mui/material'
import { auth, provider } from './firebase'
import { signInWithRedirect } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'

function Login() {
  const dispatch = useDispatch()

  const signIn = () => {
    signInWithRedirect(auth, provider)
    .then((user) => {
      dispatch(login({
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
      }))
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div className='login'>
      <div className="login__container">
        <img src={require('./images/gmail_icon.png')} alt="" />  
        <Button onClick={signIn} color="primary" variant="contained">Login</Button>
      </div>
    </div>
  )
}

export default Login