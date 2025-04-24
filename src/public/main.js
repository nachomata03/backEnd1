const socket = io();

let username = prompt('Ingresa tu nombre');

socket.emit('login', username);

socket.on('new-user', (data) => {
    alert(`${data} se ha unido al chat`);
})

const form = document.querySelector('#form');
const inputMessage = document.querySelector('#message');
const viewMessages = document.querySelector('#view-messages');

//recibo los mensajes del servidor
socket.on('view-messages', (data) => {
    let messages = "";
    if(data.length)
    {
        messages = data.reduce((acc, document) => {
            return acc + `<p> ${document.username}:${document.message}</p>`; //se usa reduce para poder convertir todos los strings en un unico STRING y asi poder pasarselo al div;
        }, "") //se usa reduce para poder convertir todos los strings en un unico STRING y asi poder pasarselo al div
    }else{
        messages = "<p>No hay mensajes</p>"
    }

    viewMessages.innerHTML = `<div>${messages}</div>`
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data ={ message: inputMessage.value, username };
    socket.emit('new-message', data);
    inputMessage.value = '';
})