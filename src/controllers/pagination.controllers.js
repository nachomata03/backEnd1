import {paginationService} from '../services/index.js';

import { PaginationParameters } from 'mongoose-paginate-v2';
import config from '../config/index.js';
import userDto from '../dto/user.dto.js';

const {PORT} = config

const pathProd = `http://localhost:${PORT}/api/all-products`

export default class PaginationController{
    async getProducts(req, res){
        const queries = new PaginationParameters(req).get()
        const paginationObject = queries[1] || {} 
        const {query} = req.query
        const user = req.user.payload || req.user
        let sort;
    
        if(paginationObject.sort === 'asc') {
            sort = {price: 1}
        } else if (paginationObject.sort === 'desc') {
            sort = {price: -1}
        }
        
        const options = {
                limit: parseInt(paginationObject.limit),
                page: parseInt(paginationObject.page),
                sort,
            };
    
        const filtro = query ? JSON.parse(query) : {}

        try {
            let responseData;
            if(paginationService){ 
                responseData = await paginationService.getProducts(filtro, options);
            }else{
                const error = new Error('No se pudo obtener los productos');
                error.statusCode = 501;
                throw error;
            }

            if (!responseData || responseData.payload.length === 0) { 
                return res.status(404).render('products', { error: 'No se encontraron productos para los criterios dados.', productos: [] });
            }

            let prevLink = null;

            //     /?query={"category": "Bienestar General"}

            let nextLink = null;

            if(responseData.hasPrevPage) prevLink = `${pathProd}?page=${responseData.prevPage}`
            if(responseData.hasNextPage) nextLink = `${pathProd}?page=${responseData.nextPage}`

            delete responseData.offset;
            responseData.prevLink = prevLink
            responseData.nextLink = nextLink
            responseData.status = "success"

            const result = responseData.payload.map(prod => prod.toObject())
            res.render('products', {
                productos: result, 
                currentPage: responseData.currentPage, 
                hasPrevPage: responseData.hasPrevPage, 
                hasNextPage: responseData.hasNextPage, 
                prevLink,
                nextLink,
                totalPages: responseData.totalPages, 
                user
            })
        } catch (error) {
            console.log(error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
}}