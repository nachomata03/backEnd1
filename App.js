const express = require('express');
const server = express();
puerto = 8080;
server.listen(puerto, ()=> console.log(`Escuchando en el puerto ${puerto}`));
server.use(express.json())

const ProductManager = require('./productManager.js');
const productosManager = new ProductManager('./products.json');

const CartManager = require('./cartManager.js');
const cartManager = new CartManager('./carts.json');

server.get('/api/products', async (req, res) => {
    try {
        const producto = await productosManager.getProducts();
        res.send(producto)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener los productos' });
    }
})

server.get('/api/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const producto = await productosManager.getProductById(id);
        res.send(producto)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener el producto' });
    }
}) 

server.post('/api/products', async (req, res) => {
    const prod = req.body
    try {
        const producto = await productosManager.addProduct(prod);
        res.send({ message: 'El producto se cargo correctamente', producto: producto })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el producto' });
    }
})

server.put('/api/products/:pid', async (req, res) => { /*! NO ESTA EN PRODUCT MANAGER*/
    const id = parseInt(req.params.pid)
    const prodNuevo = req.body; 
    try {
        const productoActualizado = await productosManager.updateProduct(id, prodNuevo);
        if (productoActualizado) {
            res.send({ message: 'El producto se actualizó correctamente', producto: productoActualizado });
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al actualizar el producto' });
    }
});

server.delete('/api/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const producto = await productosManager.deleteProduct(id);
        res.send(`El producto se elimino correctamente ${producto}`)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
})

/**
    {   
        "title": "{{$randomProductName}}",
        "description": "{{$randomJobDescriptor}}",
        "price": "{{$randomPrice}}",
        "stock": "{{$randomAdjective}}",
        "category": "{{$randomAdjective}}",
        "thumbnails": "{{$randomAdjective}}",
        "discount":"{{$randomAdjective}}",
        "status":"{{$randomAdjective}}",
        "code":"{{$randomAdjective}}"
    }
*/


server.post('/api/carts',async (req, res) => {
    const producto = req.body
    try {
        const cart = await cartManager.addCart(producto);
        res.send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

server.post('/api/carts/:cid/products/:pid',async (req, res) => {
    const pid = parseInt(req.params.pid);
    const cid = parseInt(req.params.cid);
    try {
        let cart = await cartManager.addProductToCart(cid, pid);
        cart == null ? res.status(404).send({ error: 'La orden de compra no existe con ese id' }) : res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

server.get('/api/carts/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const cart = await cartManager.getCartById(id);
        res.send(cart)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener el carrito' });
    } 
})