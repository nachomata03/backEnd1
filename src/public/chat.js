const socket = io();
let currentUser;

const form = document.querySelector('#form');
const inputMessage = document.querySelector('#message');
const viewMessages = document.querySelector('#view-messages');

async function login(socket) {
    const { value: userName } = await Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
    })
    currentUser = userName;
    socket.emit('login', currentUser);
} 

function handleNewUser(socket){
    socket.on('new-user', (data) => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: `${data} se ha conectado`,
            background: '#a5dc86',
        })
    })
}

function handleViewMessage(socket){
    socket.on('view-messages', (data) => {
        let messages = "";
        if(data.length)
        {
            messages = data.reduce((acc, document) => {
                return acc + `<p> ${document.currentUser === currentUser ? "Tu" : document.currentUser}:${document.message}</p>`; //se usa reduce para poder convertir todos los strings en un unico STRING y asi poder pasarselo al div;
            }, "") //se usa reduce para poder convertir todos los strings en un unico STRING y asi poder pasarselo al div
        }else{
            messages = "<p>No hay mensajes</p>"
        }
    
        viewMessages.innerHTML = `<div>${messages}</div>`
    })
}

function handleNewMessage(socket){
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data ={ message: inputMessage.value, currentUser };
        socket.emit('new-message', data);
        inputMessage.value = '';
    })
}

export function chat(socket){
    login(socket);
    handleNewUser(socket);
    handleViewMessage(socket);
    handleNewMessage(socket);
}

chat(socket);
