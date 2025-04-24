export default (io)=> {
    const messages = [];
    io.on('connection', (socket) => {
        console.log(`Un nuevo cliente se conector, ID:${socket.id}`);
        //emite un evento con el mensaje
        socket.emit("view-messages", messages);

        socket.on("new-message", (data) => {
            messages.unshift(data); // para que el ultimo msg te aparezca al inicio
            /* socket.emit("view-messages", messages) // emite los mensaje cuando detecta que hay un nuevo mensaje y los manda al ID (persona)
            socket.broadcast.emit("view-messages", messages) //emite los mensajes a todos menos al que lo envia */
            io.emit("view-messages", messages) // emite los mensajes a todos
        });

        socket.on('login', (data) => {
            socket.broadcast.emit('new-user', data);
        })
    });
}