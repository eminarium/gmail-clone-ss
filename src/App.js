import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Mail from './Mail'
import EmailList from './EmailList'
import SendMail from './SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { auth } from './firebase';
import { login, selectUser } from './features/userSlice';
import Login from './Login';

function App() {

  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // the user is logged in
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        }))
      } else {
        // the user is logged out
      }
    })
  }, [])

  return (
    <Router>

      {
        !user ? (
          <Login />
        ) : (
          <div className="app">
            <Header />

            <div className="app__body">
              <Sidebar />

              <Routes>
                <Route path="/mail" element={<Mail />} />
                <Route path="/" element={<EmailList />} />
              </Routes>
            </div>

            { sendMessageIsOpen &&  <SendMail /> }
          </div>
        )
      }

    </Router>
  );
}

export default App;
