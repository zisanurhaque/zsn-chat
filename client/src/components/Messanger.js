import React from 'react'
import MessangerHeader from './MessangerHeader'
import MessageBody from './MessageBody';
import MessangerFooter from './MessangerFooter';

const Messanger = ({handleMessages, message, setMessage, user}) => {

  return (
    <div>

      <div className="content">

        <MessangerHeader user={user}/>

        <MessageBody user={user}/>

        <MessangerFooter handleMessages={handleMessages} setMessage={setMessage} user={user} message={message}/>

      </div>

    </div>
  )
}

export default Messanger
