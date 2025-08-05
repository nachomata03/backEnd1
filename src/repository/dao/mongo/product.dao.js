import ProductsModel from "./models/Products.models.js";
import mongoose from "mongoose";

function isValidObjectId(id) {
        return typeof id === 'string' && mongoose.Types.ObjectId.isValid(id) && id.match(/^[0-9a-fA-F]{24}$/);
    }
export default class ProductsMongoDao {
    async getProducts() {
        return await ProductsModel.find();
    }
    async getProduct(id){
        if (isValidObjectId(id)) {
        return await ProductsModel.findById(id);
        } else {
            return await ProductsModel.findOne({ id: id });
        }
    }
    async createProduct(body){
        let ultimoId = await ProductsModel.find().sort({ _id: -1 }).limit(1);
        body.id = (ultimoId[0]?.id || 0) + 1;
        return await ProductsModel.create(body);
    }
    async updateProduct(id, body){
        return await ProductsModel.updateOne({ _id: id }, { $set: body });
    }
    async deleteProduct(id){
        return await ProductsModel.deleteOne({ _id: id });
    }
}