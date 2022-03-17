// Required Modules
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const server = http.createServer(app); // Creating Server

// Required Socket.io
const { Server } = require('socket.io');

dotenv.config({path: "./config.env"})

const PORT = process.env.PORT || 8080 // Port Number

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "https://zsn-chat.herokuapp.com/", // Cors Allows This Site
        methods: ["GET", "POST"] // This methods will work 
    }
})

io.on('connection', (socket) => {
    socket.on('chat', (value) => { // Getting Values From Client
        io.emit('display', value) // Values Sent To Client
    })
})

// App Deployment Code

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Server Listening
server.listen(PORT, () => {
    console.log("Server Running...")
})