import React from 'react'
import "./SendMail.css"
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { closeSendMessage } from './features/mailSlice'
import { db } from "./firebase.js"
import { serverTimestamp, onSnapshot, orderBy, query, collection, addDoc } from "firebase/firestore"

function SendMail() {

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }
  } = useForm()

  const onSubmit = async (formData) => {
    console.log(formData)

    try {
      const docRef = await addDoc(collection(db, "emails"), {
        to: formData.To,
        subject: formData.Subject,
        message: formData.Message,
        timestamp: serverTimestamp()
      })
    } catch(e) {
      console.error("Error adding document: ", e)
    }

    dispatch(closeSendMessage())

  }

  const dispatch = useDispatch();

  return (
    <div className='sendMail'>
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon 
          className='sendMail__close' 
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          placeholder='To' 
          type="email" 
          {...register('To', { required: true })} 
        />
        {errors.To && <p className='sendMail__error'>To is required.</p>}

        <input 
          placeholder='Subject' 
          type="text" 
          {...register('Subject', { required: true })} 
        />
        {errors.Subject && <p className='sendMail__error'>Subject is required.</p>}

        <input 
          placeholder='Message...' 
          type="text" 
          className='sendMail__message' 
          {...register('Message', { required: true })} 
        />
        {errors.Message && <p className='sendMail__error'>Message is required.</p>}

        <div className="sendMail__options">
          <Button 
            className='sendMail__send'
            variant='contained'
            color="primary"
            type='submit'
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SendMail