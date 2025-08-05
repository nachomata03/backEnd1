import config from '../config/index.js'

import ProductsMongoRepository from '../repository/mongoDB/product.repository.js'
import CartsMongoRepository from '../repository/mongoDB/cart.repository.js'

import ProductsFileSystemRepository from '../repository/fileSystem/product.repository.js'
import CartsFileSystemRepository from '../repository/fileSystem/cart.repository.js'

import UsersMongoRepository from '../repository/mongoDB/user.repository.js'
import UsersFileSystemRepository from '../repository/fileSystem/user.repository.js'

import PaginationRepository from '../repository/mongoDB/pagination.repository.js'

import ProductsService from './products.services.js'
import CartsService from './cart.services.js'
import UsersService from './users.services.js'
import PaginationService from './pagination.service.js'

const {STORAGE} = config
let ProductsRepository;
let CartsRepository;
let UsersRepository;

export let paginationService = null ;

if(STORAGE === 'MONGODB' || STORAGE === 'MONGOATLAS'){
    ProductsRepository = new ProductsMongoRepository();
    CartsRepository = new CartsMongoRepository();
    UsersRepository = new UsersMongoRepository();
    
    const paginationProdRepository = new PaginationRepository(ProductsRepository);
    paginationService = new PaginationService(paginationProdRepository);
}else{
    ProductsRepository = new ProductsFileSystemRepository();
    CartsRepository = new CartsFileSystemRepository();
    UsersRepository = new UsersFileSystemRepository();
    paginationService = null; 
}

export const productsService = new ProductsService(ProductsRepository);
export const cartsService = new CartsService(ProductsRepository, CartsRepository);
export const usersService = new UsersService(UsersRepository, CartsRepository);