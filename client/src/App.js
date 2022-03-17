import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://zsn-chat.herokuapp.com/")

const App = () => {

    const [message, setMessage] = useState("");
    const [name, setName] = useState("")
    const [chat, setChat] = useState([])

    const handleMessages = (e) => {
        e.preventDefault()
        const value = {
            message: message,
            name: name
        }
        socket.emit("chat", value)
        setMessage("")
        setName(name)
    }

    useEffect(() => {
        socket.on("display", (data) => {
            setChat([...chat, data])
        })
    })

    return(
        <div className="app">
            <div className="content">

                <div className="msgHeader">
                    <h4>Live Chat</h4>
                </div>

                <div className="msgBody">

                    {
                        chat.map((item) => (
                            <div className={item.name === name ? "msgBox user" : "msgBox frnd"}>
                                <div className="message">
                                    <p>{item.message}</p>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className="msgForm">
                    <form onSubmit={(e) => handleMessages(e)}>
                        <input className='name' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="text" placeholder="type message" value={message} onChange={(e) => setMessage(e.target.value)}/> 
                        <button type="submit">Send</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default App;