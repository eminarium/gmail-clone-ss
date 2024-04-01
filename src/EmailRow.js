import React from 'react'
import { IconButton, Checkbox } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined'
import "./EmailRow.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectMail } from './features/mailSlice'

function EmailRow({ id, to, subject, message, time }) {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const openMail = () => {
    dispatch(selectMail({
      id, to, subject, message, time
    }))

    navigate("/mail")
  }

  return (
    <div onClick={openMail} className='emailRow'>
      <div className="emailRow__options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>

      <div className="emailRow__title">
        { to }
      </div>

      <div className="emailRow__message">
        <h4> 
          { subject }{" "}
          <span className="emailRow__description"> - 
            { message }
          </span>
        </h4>
      </div>

      <p className="emailRow__time">{ time } </p>
    </div>
  )
}

export default EmailRow