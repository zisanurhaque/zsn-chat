const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: "./config.env"})

const PORT = process.env.PORT || 8080

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "https://zsn-chat.herokuapp.com/",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    socket.on('chat', (value) => {
        io.emit('display', value)
    })
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

server.listen(PORT, () => {
    console.log("Server Running...")
})