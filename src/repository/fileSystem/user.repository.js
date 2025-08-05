import UserFsDao from "../dao/fs/user.dao.js";
export default class UsersFileSystemRepository {
    constructor(){
        this.dao = new UserFsDao();
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
        const result = await this.dao.createUser(body);
        return result;
    }
    async updateUser(id, body){
        return await this.dao.updateUser(id, body);
    }
    async deleteUser(id){
        return await this.dao.deleteUser(id);
    }
}