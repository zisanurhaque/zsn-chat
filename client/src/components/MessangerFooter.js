import React from 'react'

const MessangerFooter = ({handleMessages, setMessage, user, message}) => {
  return (
    <>
        <div className="msgForm">
            <form onSubmit={(e) => handleMessages(e, user)}>
                <input type="text" placeholder="type message" value={message} onChange={(e) => setMessage(e.target.value)}/> 
                <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
    </>
  )
}

export default MessangerFooter
