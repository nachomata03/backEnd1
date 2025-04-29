import ProductManager from './managers/productManager.js';

const productosManager = new ProductManager('./data/products.json');

export default async (io)=> {
    const messages = [];
    io.on('connection', async (socket) => {
        console.log(`Un nuevo cliente se conector, ID:${socket.id}`);

        socket.on('login', (data) => {
            socket.broadcast.emit('new-user', data);
        })

        //emite un evento con el mensaje
        socket.emit("view-messages", messages);

        socket.on("new-message", (data) => {
            messages.unshift(data); // para que el ultimo msg te aparezca al inicio
            //socket.emit emite los mensaje cuando detecta que hay un nuevo mensaje y los manda al ID (persona)
            //socket.broadcast.emit emite los mensajes a todos menos al que lo envia 
            io.emit("view-messages", messages) // emite los mensajes a todos
        });

        //------------------------- trabajo con el listado de productos en tiempo real ------------------------

        socket.on('new-product', async (data) => {
            await productosManager.addProduct(data);
            io.emit(`view-products`, await productosManager.getProducts());
        })
        
        const productos = await productosManager.getProducts();

        socket.emit("view-init-prod", productos);

        socket.on('init-view', () => {
            io.emit(`view-products`, productos)
        })

        socket.on('remove-product', async (id) => {
            await productosManager.deleteProduct(id);
            io.emit(`view-products`, await productosManager.getProducts());
        })
    });
}