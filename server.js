const express = require('express');
const server = express();
puerto = 8080;
server.listen(puerto, ()=> console.log(`Escuchando en el puerto ${puerto}`));
server.use(express.json())

const productos = require('./data.js');
/* const productos = [];  */
server.get('/api/products',(req, res) => {
    if(productos.length === 0 || !productos){
        res.status(404).send({error: 'No se encontraron productos'})
    }
    else{
        res.send(productos)
    }
}
)

server.get('/api/products/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const prodID = productos.find((prod) => prod.id === id);     
    if(!prodID){
        res.status(404).send({error:"No se encontro el producto."})
    }else{
        res.send(prodID)
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
        "status":"{{$randomAdjective}}"
    }
 */
server.post('/api/products', (req, res) => {
    const producto = req.body
    const idNuevo = productos.length + 1
    const codeNuevo = `PC0${idNuevo}`
    if(productos.push({code: codeNuevo, id: idNuevo, ...producto})) return res.send("El producto se agrego correctamente")
    res.status(400).send("El producto no se pudo agregar")
})

server.put('/api/products/:pid', (req, res) => {
    const id = parseInt(req.params.pid)
    const productoEncontrado = productos.find((prod) => prod.id === id);
    if (!productoEncontrado) return res.status(404).send({ error: "No se encontró el producto." });
    const produActualizado = req.body;
    Object.assign(productoEncontrado, produActualizado); //Usamos Object.assign para copiar las propiedades de produActualizado al objeto productoEncontrado. Esto actualiza el producto en el array productos.
    res.send("El producto se actualizó correctamente");
});

server.delete('/api/products/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const index = productos.findIndex((prod) => prod.id === id);
    if (index === -1) return res.status(404).send({ error: "No se encontró el producto." });
    productos.splice(index, 1); // tambien se puede usar productos = productos.filter((prod) => prod.id !== id);
    res.send("El producto se eliminó correctamente");
})


// Cart

server.post('/api/carts',(req, res) => {
    const products = []
    const producto = req.body
    const idNuevo = products.length + 1
    if(products.push({id: idNuevo, quantity: 1})) return res.send("El producto se agrego correctamente")
    res.status(400).send("El producto no se pudo agregar")
})

server.get('/api/carts/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const prodID = products.find((prod) => prod.id === id);     
    if(!prodID){
        res.status(404).send({error:"No se encontro el producto."})
    }else{
        res.send(prodID)
    } 
})