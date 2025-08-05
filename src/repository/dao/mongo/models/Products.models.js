import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductsCollection = "products"

const ProductSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default : null
    },
    status: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})

mongoosePaginate.paginate.options = {
    customLabels:{
        docs: "payload",
        offset: false,
        limit: false,
        pagingCounter: false,
        totalDocs: false,
        page: "currentPage",
    }
};

ProductSchema.plugin(mongoosePaginate);

const ProductsModel = mongoose.model(ProductsCollection, ProductSchema)
export default ProductsModel