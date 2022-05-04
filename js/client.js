const socket=io('http://localhost:8000');
const form =document.getElementById('send-container')//receive

const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

const append=(message,position)=>{
    const messageElement= document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play(); 
    }
}
var audio =new Audio('ting.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})
const nam =prompt("Enter ur name to join");
socket.emit('new-user-joined',nam)


socket.on('user-joined',name=>{
    append(`${name} joined the chat`,`right`)
})


socket.on('receive',data=>
{
    append(`${data.name}: ${data.message}`,`left`)
})

socket.on('left',name=>{

    append(`${name} left the chat`,`left`)
})