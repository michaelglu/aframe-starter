const express = require('express');
const path =require('path');
const uniqid = require('uniqid');
const http=require('http');
const publicPath=path.join(__dirname+'/../client');
const port=process.env.PORT||3000;
const socketIO=require('socket.io');

const app =express();
const server = http.createServer(app);
const {generateMessage}=require('./utils/message.js');
const io =socketIO(server)

let userCount=-1;

io.on('connection',(socket)=>{
    // console.log('New User Connected');

    userCount++;
    socket.emit('newMessage',generateMessage(-1,true,0,0,0,uniqid()));
    socket.broadcast.emit('newMessage',generateMessage(userCount,0,0,0));


    socket.on('createMessage',(message,callback)=>{
      // console.log('createMessage',message);
      io.emit('newMessage',generateMessage(message.from,false,message.x,message.y,message.z));
      callback('Position Updated');

    });


    socket.on('disconnect',(socket)=>{
        console.log('User Disconnected');
    });
});

function loopFun(){
    // console.log("ROUTINE CHECK")
    io.emit('periodicUpdate',"HELLO WORLD");
}
setInterval(loopFun,50);

app.use(express.static(publicPath));
server.listen(port,() =>{
  console.log(`Running on ${port}`);
})
