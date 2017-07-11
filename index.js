const express = require('express')
const app = express();
const http = require('http').Server(app)

const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

// Set up variable to hold users and messages
const users = []
const messages = []

io.on('connection', socket => {

   // Receive new socket and give users and messages to socket
   console.log('New Socket:', socket.id)
   io.sockets.to(socket.id).emit("initialData", {
      users, messages
   })
   socket.on('newUser', username => {
      let newUser = {id: socket.id, username: username}
      users.push(newUser)
      console.log('New Username:', newUser)
      io.sockets.emit('newUser', newUser)
   })

   socket.on('newMessage', message => {
      messages.push(message)
      console.log('New Message:', message)
      io.sockets.emit('newMessage', message)
   })
})

http.listen(3000);