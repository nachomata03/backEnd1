import {chat} from './chat.js';
import {viewProducts} from './viewProducts.js';
const socket = io();

/* chat(socket); */
viewProducts(socket);