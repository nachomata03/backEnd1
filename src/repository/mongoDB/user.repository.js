import UsersMongoDao from "../dao/mongo/user.dao.js";

export default class UsersMongoRepository {
    constructor(){
        this.dao = new UsersMongoDao();
    }
    async getUsers() {
        return await this.dao.getUsers();
    }
    async getUser(id){
        return await this.dao.getUser(id);
    }

    async getUserByEmail(email){
        return await this.dao.getUserByEmail(email);
    }

    async createUser(body){
        return await this.dao.createUser(body);
    }
    async updateUser(id, body){
        return await this.dao.updateUser(id, body);
    }
    async deleteUser(id){
        return await this.dao.deleteUser(id);
    }
}