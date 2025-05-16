import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();

const productosManager = new ProductManager('/data/products.json')

// /api/products TRAE TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const producto = await productosManager.getProducts();
        res.json(producto)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

// /api/products/:pid TRAE UN PRODUCTO POR ID
router.get('/:pid', async (req, res) => {
const id = parseInt(req.params.pid);
    try {
        const producto = await productosManager.getProductById(id);
        res.send(producto)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener el producto' });
    }
})

// /api/products AGREGA UN PRODUCTO
router.post('/', async (req, res) => {
    const prod = req.body
    if(!prod.title || !prod.description || !prod.price || !prod.thumbnail || !prod.code || !prod.stock) return res.status(400).send({ error: 'Todos los campos son obligatorios' });
    try {
        const producto = await productosManager.addProduct(prod);
        res.send({ message: 'El producto se cargo correctamente', producto: producto })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el producto' });
    }
})

// /api/products/:pid ACTUALIZA UN PRODUCTO
router.put('/:pid', async (req, res) => { 
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

// /api/products/:pid ELIMINA UN PRODUCTO
router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const producto = await productosManager.deleteProduct(id);
        res.send(`El producto se elimino correctamente ${producto}`)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
}) 

export default router;