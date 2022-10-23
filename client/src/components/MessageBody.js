import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'; // Getting Module Socket-Client

const socket = io.connect("https://zsn-chat.herokuapp.com/") 

const MessageBody = ({user}) => {

    const [chat, setChat] = useState([])

    const useChatScroll = (dep) => {
        const ref = React.useRef();
        React.useEffect(() => {
          if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
          }
        }, [dep]);
        return ref;
      }
    
      const ref = useChatScroll(chat)

    useEffect(() => {
        socket.on("display", (data) => { // Getting values from server
            setChat(data) // Storing Values In A State To Display Them In Client Side
        })
    }, [])

  return (
      <div className="msgBody">

        <div className='container' ref={ref}>

          {
              chat.map((item, index) => (
                  <div key={index}>

                      {
                          item.message === "" ? "" :
                          <div className={item.name === user ? "msgBox user" : "msgBox frnd"}>
                              
                              <div className="message">
                                  <p>{item.message}</p>
                              </div>
                              
                          </div>
                      }

                  </div>
              ))
          }

        </div>

    </div>
  )
}

export default MessageBody
