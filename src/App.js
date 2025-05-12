import express from 'express';
import handlebars from 'express-handlebars';

import vistas from './routes/vistas.js';    
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/cart.router.js';
import UsersRouter from './routes/users.router.js';
import { Server } from 'socket.io';
import http from 'http';
import websocket from './websocket.js';

import dotenv from 'dotenv';
import mongoose from 'mongoose';


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongmongodb://localhost:27017/";

mongoose.connect(MONGO_URI, {
    dbName: "ecommerce",
}).then(() => {
    console.log("Base de datos conectada");
}).catch((error) => {
    console.log(`Error al conectar a la base de datos ${error}`);
})

const puerto = process.env.PORT || 8080;
const app = express(); //inicializo el servidor de express
const httpServer = http.createServer(app); //creo el servidor pasandole el servidor de express
const io = new Server(httpServer); //servidor de sockets
websocket(io);

httpServer.listen(puerto, ()=> console.log(`Escuchando en el puerto ${puerto}`));

app.use(express.json()) //para recibir datos de un body / formulario
app.use(express.urlencoded({extended: true})) //para recibir datos de los header o path


app.engine('handlebars', handlebars.engine()); //inicio de handlebars
app.set('views', join(__dirname, '/' ,'views')); //direccion de la plantillas de handlebars y como se llama la carpeta
app.set('view engine', 'handlebars'); //que motor de plantillas usamos view engine y handlebars
app.use(express.static(join(__dirname, 'public')));  //donde se alojan los archivos de handlebars


app.use('/', vistas); //configuro la ruta y lo que se muestra en vistas

//hacemos que el servidor use el router y le ponemos la ruta y ahi usa todos los metodos
app.use('/api/products', ProductsRouter);
//hacemos que el servidor use el router y le ponemos la ruta y ahi usa todos los metodos
app.use('/api/carts', CartsRouter);

app.use('/users', UsersRouter);

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