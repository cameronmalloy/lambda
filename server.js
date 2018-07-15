const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const LambdaGame = require('./lambda-game');

const app = express();

const clientPath = `${__dirname}/client`;


app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let matchMap = new Map();

io.on('connection', (sock) => {
    
    sock.on('message', (text) => {
        io.emit('message', text);
    });

    sock.on('secret', (key) => {
        if (matchMap.has(key)) {
            firstSock = matchMap.get(key);
            matchMap.delete(key);
            new LambdaGame(firstSock, sock);
        }
        else {
            matchMap.set(key, sock);
            sock.emit('message', 'Waiting for opponent');
        }
    });
})

server.on('error', (err) => {
    console.error('Server error:', err);
});

const port = process.env.PORT || 3000//8080;

server.listen(port, () => {
    console.log('LG started on 8080');
});