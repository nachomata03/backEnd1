import { Router } from "express";
import userRouter from "./users.router.js";
import cartRouter  from "./cart.router.js";
import productRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.js";
import vistaRouter from "./vistas.js";

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/carts', cartRouter);
indexRouter.use('/products', productRouter);
indexRouter.use('/sessions', sessionsRouter);
indexRouter.use('/', vistaRouter);

export default indexRouter