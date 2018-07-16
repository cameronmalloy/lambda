const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { Pool } = require('pg');

const LambdaGame = require('./lambda-game');

const app = express();

const clientPath = `${__dirname}/client`;


app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let matchMap = new Map();

io.on('connection', (sock) => {
    
    sock.on('message', (text) => {
        io.emit('global-message', text);
    });

    sock.on('secret', (key) => {
        if (matchMap.has(key[1])) {
            firstSock = matchMap.get(key[1]);
            matchMap.delete(key[1]);
            new LambdaGame(firstSock[0], sock, firstSock[1], key[0]);
        }
        else {
            matchMap.set(key[1], [sock, key[0]]);
            sock.emit('message', 'Waiting for opponent');
            sock.emit('updateScroll');
        }
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

const port = process.env.PORT || /*3000;*/8080;

server.listen(port, () => {
    console.log('LG started on 8080');
});

const pool = new Pool({
  connectionString: 'process.env.postgres://cggcktywvhqxxs:043a113824ae68699347c04572cd0864fe79eb7284e09a72e3b226dc58b99122@ec2-54-227-240-7.compute-1.amazonaws.com:5432/d6sdpfkqvnu2j3',
  ssl: true
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});