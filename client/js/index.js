var socket=io();
var count=0;
var myId;
var others= [];
var isInitialized=false;


// var scene=document.querySelector('a-scene').addEventListener('loaded', function() {
// isInitialized=true;
// });;

socket.on('connect',function(){
  console.log('connected to server');


});
socket.on('disconnect',function(){
  console.log('disconnected from the server');
});

socket.on('periodicUpdate',function(){
  console.log("PERIODIC UPDATE");
  var myself=document.getElementById('user-cam');
  if(myself!=null){
    // console.log(myself.getAttribute('position'));
    socket.emit('createMessage',{
      from:myId,
      isWelcome:true,
      x:myself.getAttribute('position').x,
      y:myself.getAttribute('position').y,
      z:myself.getAttribute('position').z},function(data){
        console.log("SENT ",data);
      });
  }

});

socket.on('newMessage',function(message){
  console.log('New Message',message);
  if(message.from==-1){
    if(!message.isWelcome){
      console.log("SENDING MY POSTION");
      if(isInitialized){
        var myself=document.querySelector('user-cam');
        if(myself!=null){
            console.log(myself.getAttribute('position'));
        }
      }
    }else{

      myId=message.newId;
    }
  }
  else{

  // your stuff goes here
  // if(isInitialized){
    var scene=document.querySelector('a-scene');

    if(scene!=null){
        var isNew=true;
      if(others!=null){
        for(i=0;i<others.length;i++){
          if(others[i]==message.from){
            isNew=false;
          }
        }
      }
      if(isNew /*&& message.from!==myId*/){
        var avatar = document.createElement('a-box');
        avatar.id=message.from;
        avatar.setAttribute('position',{x:message.x,y:message.y,z:message.z});
        others.push(message.from);
        scene.appendChild(avatar);
        console.log("Appended element");
      }
      else{
        var avatar = document.getElementById(message.from);
        avatar.setAttribute('position',{x:message.x,y:message.y,z:message.z});
        console.log("Modified element");
      }

      // others.push(avatar);

    }
    // }
  }




});
// socket.emit('createMessage',{from:'Bob',text:'Clark hates me'}, function(data){
//   console.log('got it',data);
// });
