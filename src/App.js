import express from 'express';
import handlebars from 'express-handlebars';

import vistas from './routes/vistas.js';    
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/cart.router.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express(); //inicializo el servidor

server.engine('handlebars', handlebars.engine()); //inicio de handlebars

server.set('views', join(__dirname, '/' ,'views')); //direccion de la plantillas de handlebars y como se llama la carpeta
server.set('view engine', 'handlebars'); //que motor de plantillas usamos view engine y handlebars
server.use(express.static(join(__dirname, '/' ,'views', '/', 'layouts')));  //donde se alojan los archivos de handlebars


server.use('/', vistas); //configuro la ruta y lo que se muestra en vistas
server.use('/', vistas);

//hacemos que el servidor use el router y le ponemos la ruta y ahi usa todos los metodos
server.use('/api/products', ProductsRouter);
//hacemos que el servidor use el router y le ponemos la ruta y ahi usa todos los metodos
server.use('/api/carts', CartsRouter);



const puerto = 8080;
server.listen(puerto, ()=> console.log(`Escuchando en el puerto ${puerto}`));
server.use(express.json()) //para recibir datos de un body / formulario
server.use(express.urlencoded({extended: true})) //para recibir datos de los header o path
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