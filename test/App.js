const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

// app init
const app = express();

//body-parser init
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
});

// server init
const port = 8080;
const server = app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})

// socket.io init
const io = socketio(server)
// socket.io config
io.on('connection',(socket)=>{
    console.log('we have our connection to socket.io');

    socket.on('join',(data)=>{
        socket.join(data.room);
        io.in(data.room).emit('message',`hello in ${data.room}`)
    })

    socket.on('message',(data)=>{
        console.log(data.room)
        io.in(data.room).emit('message',data.dat)
    })

    //socket.broadcast.emit('message','someone join to chat room');

    socket.on('disconnect',()=>{
        io.emit('message','someone leave the chat room')
        console.log('we dont have any connection to socket.io')
    })
})