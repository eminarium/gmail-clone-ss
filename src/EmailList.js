import React, { useEffect, useState } from 'react'
import Section from './Section'
import { Checkbox, IconButton } from '@mui/material'
import ArrowDropdownIcon from '@mui/icons-material/ArrowDropDown'
import RedoIcon from '@mui/icons-material/Redo'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide'
import SettingsIcon from '@mui/icons-material/Settings'
import InboxIcon from '@mui/icons-material/Inbox'
import PeopleIcon from '@mui/icons-material/People'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import './EmailList.css'
import EmailRow from './EmailRow'
import { serverTimestamp, onSnapshot, orderBy, query, collection, addDoc } from "firebase/firestore"
import { db } from './firebase'

function EmailList() {

  const [emails, setEmails] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(db, "emails"), orderBy("timestamp", "desc")), (snapshot) => {
      const newData = snapshot.docs.map((doc) => (
          {
            ...doc.data(),
            id: doc.id
          }
        )
      )
      setEmails(newData);
    })
  }, [])
  return (
    <div className='emailList'>
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropdownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emailList__settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      <div className="emailList__sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>

      <div className="emailList__list">
        {
          emails.map(({id, to, subject, message, timestamp}) => (
              <EmailRow
                key = { id }
                to = { to }
                subject = { subject }
                message = { message }
                time = { new Date(timestamp?.seconds*1000).toUTCString() }
              />
            )
          )
        }
      </div>
    </div>
  )
}

export default EmailList