import ProductManager from './managers/productManager.js';

const productosManager = new ProductManager('./data/products.json');

export default async (io)=> {
    io.on('connection', async (socket) => {
        console.log(`Un nuevo cliente se conecto, ID:${socket.id}`);

        function initChat(){
            const messages = [];
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
        }
        async function initViewProd(){
            socket.on('init-view', async () => {//muestra todos los productos inicialmente
                try{
                    io.emit(`view-products`, await productosManager.getProducts())
                }catch(err){
                    socket.emit(`error`,{message: err})
                }
                
            })

            socket.on('new-product', async (data) => {//agrega un nuevo producto
                try{
                    await productosManager.addProduct(data);
                    io.emit(`view-products`, await productosManager.getProducts());
                }catch(err){
                    io.emit(`error`, {message: err})
                }
            })
    
            socket.on('remove-product', async (id) => { //remueve el producto recibiendo el id
                await productosManager.deleteProduct(id);
                io.emit(`view-products`, await productosManager.getProducts());
            })
        }
        initViewProd()
        initChat()
    });
}