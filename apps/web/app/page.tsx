"use client"
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import './page.css'

export default function Page() {
   const {sendMessage, messages} = useSocket()
   console.log('this is the messages', messages)
   const [message, setMessage] = useState('')
  return (
    <div className="chat-container">
      <div className="header">
        <h1>Messages</h1>
      </div>
      <div className="message-input">
        <input onChange={e=> setMessage(e.target.value)} type="text" placeholder="Enter the message here" />
        <button onClick={e=> sendMessage(message)}>Send</button>
      </div>
      <div>
        {messages.map((e)=>(
          <li>{e}</li>
        ))}
      </div>
    </div>
  );
}
