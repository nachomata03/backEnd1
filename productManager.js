//npm install para package-lock.json

/*

class ProductManager{

    static countIdProd = 0;
    constructor(){
        this.products = [];
    }

    mostrar(){
        console.log(this.products);
    }

    addProduct(prod){
        if(prod.title == "" || prod.description == "" || prod.price == "" || prod.urlImg == "" || prod.code == "" || prod.stock == "")
            {return console.log(`Todos los campos son obligatorios, en code: ${prod.code}`)}
        
        else if(this.products.some(producto => producto.code == prod.code))
            {return console.log(`El producto ${prod.code} ya existe`)}
        
        else{
            ProductManager.countIdProd++;
            const prodId = {id: ProductManager.countIdProd}
            const producto = Object.assign({}, prod, prodId);
            this.products.push(producto)
            console.log(`Producto ${prod.code} agregado con exito`) 
        }
    }

    getProductById(id){
        const productoID = this.products.find(producto => producto.id == id)
        if(productoID)
            {return productoID}
        else
            {return console.log(`El producto con el id ${id} no existe`)}
    }

    getProducts()
        {return this.products}
    
}

const manager = new ProductManager();

const productoDefault = {
    title: "Producto 1",
    description: "Descripcion producto 1",
    price: 1000,
    urlImg: "img1",
    code: 1,
    stock: 10
}

manager.addProduct(productoDefault);

const productoDefault2 = {
    title: "Producto 2",
    description: "Descripcion producto 2",
    price: 2000,
    urlImg: "img2",
    code: 2,
    stock: 20
}

manager.addProduct(productoDefault2);

manager.getProductById(3)

 */

const fs = require('node:fs/promises');

class productManager {
    constructor(filepath) {
        this.filepath = filepath;
    }

    async getProducts() {
        try {
            const producto = await fs.readFile(this.filepath, 'utf-8');
            const productos = JSON.parse(producto);
            return productos
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addProduct(prod) {
        try {
            const producto = await fs.readFile(this.filepath, 'utf-8');
            const productos = JSON.parse(producto);

            const maxId = Math.max(...productos.map(producto => producto.id)) || 0;
            const newProduct = { id: maxId + 1, ...prod };
            productos.push(newProduct);

            await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2), 'utf-8');
            return newProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProduct(id, prod){
        try {
            const producto = await fs.readFile(this.filepath, 'utf-8');
            const productos = JSON.parse(producto);
            const productoactualizado = productos.findIndex(producto => producto.id === id);
            productos[productoactualizado] = {...productos[productoactualizado], ...prod}
            
            await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2), 'utf-8');
            return productos[productoactualizado];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const producto = await fs.readFile(this.filepath, 'utf-8');
            const productos = JSON.parse(producto);
            const findProduct = productos.find(producto => producto.id === id);
            if (!findProduct) return console.log(`El producto con el id ${id} no existe`);
            return findProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const producto = await fs.readFile(this.filepath, 'utf-8');
            const productos = JSON.parse(producto);

            const findProduct = productos.find(producto => producto.id === id);
            if (!findProduct) return console.log(`El producto con el id ${id} no existe`);

            const updatedProducts = productos.filter(producto => producto.id !== id);
            await fs.writeFile(this.filepath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
            return productos.length;
        } catch (error) {
            console.log(error); 
            throw error;
        }
    }  
}

module.exports = productManager

