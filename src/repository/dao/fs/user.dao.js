import usersManager from '../fs/managers/usersManager.js';
export default class UserFsDao {
    constructor(){
        this.UserManager = new usersManager('/data/users.json');
    }

    async getUsers() {
        return await this.UserManager.getUsers();
    }
    async getUser(id){
        return await this.UserManager.getUser(id);
    }

    async getUserByEmail(email){
        return await this.UserManager.getUserByEmail(email);
    }

    async createUser(body){
        const result = await this.UserManager.addUser(body);
        return result;
    }
    async updateUser(id, body){
        return await this.UserManager.updateUser(id, body);
    }
    async deleteUser(id){
        return await this.UserManager.deleteUser(id);
    }
}