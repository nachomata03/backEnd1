import express from 'express';
import handlebars from 'express-handlebars';

import indexRouter from './routes/index.router.js';
import { Server } from 'socket.io';
import http from 'http';
import websocket from './websocket.js';
import productFileSystemRouter from './routes/productFileSystem.router.js';
import CartFileSystemRouter from './routes/cartFileSystem.router.js';

import mongoose from 'mongoose';

import config from './config/index.js';

const {PORT, MONGO_URI} = config;

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


import cookieParser from 'cookie-parser';
//import session from 'express-session';
//import MongoStore from 'connect-mongo';


import passport from 'passport';
import initializePassport from './config/passport/config.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

mongoose.connect(MONGO_URI, {
    dbName: "ecommerce",
}).then(() => {
    console.log("Base de datos conectada");
}).catch((error) => {
    console.log(`Error al conectar a la base de datos ${error}`);
})

const puerto = PORT;
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


app.use('/productsFs', productFileSystemRouter);
app.use('/cartFs', CartFileSystemRouter);


app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use('/api', indexRouter)