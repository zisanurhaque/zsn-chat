import {useState} from 'react';
import io from 'socket.io-client'; // Getting Module Socket-Client
import Messanger from './components/Messanger';
import './style.css';
import "./responsive.css";

const socket = io.connect("https://zsn-chat.herokuapp.com/") 

const App = () => {

    // States
    const [myMessage, setMyMessage] = useState("");

    const [friendMessage, setFriendMessage] = useState("");


    // Handle Message Function

    const handleMessages = (e, user) => {

        e.preventDefault()

        if(user === "Me"){
            const value = {
                message: myMessage,
                name: user
            }
            
            if(myMessage !== ""){
                socket.emit("chat", value) // Values sending to server
                setMyMessage("")    
            }

        }
        
        else{
            const value = {
                message: friendMessage,
                name: user
            }
            
            if(value.friendMessage !== ""){
                socket.emit("chat", value) // Values sending to server
                setFriendMessage("")
            }

        }

    }

    return(
        <div className="app">
            <Messanger handleMessages={handleMessages} message={myMessage} setMessage={setMyMessage} user={"Me"}/>
            <Messanger handleMessages={handleMessages} message={friendMessage} setMessage={setFriendMessage} user={"Friend"}/>
        </div>
    )
}

export default App;