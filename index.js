const { Socket } = require('dgram');
const express = require('express')
const app = express();

const http = require('http');
const server = http.createServer(app)

const {
    Server
} = require('socket.io')
const delay = require('delay')
const io = new Server(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
io.on('connection', (Socket) => {
    console.log('user connected !');
    Socket.on('on-chat', data => {
        console.log(data)

        io.emit('user-chat', data)
    })
})
server.listen(3000, () => {
    console.log(' listening on port 3000')
})

async function gialapbitcoin() {
    while (1) {
        const price = 13750 + Math.random() * 400
        io.emit('bitcoin-price', {
            price: parseFloat(price.toFixed(2))
        })
        await delay(1000)
    }

}

gialapbitcoin()