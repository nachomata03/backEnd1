import fs from "fs/promises";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class usersManager {
    constructor(filepath) {
        this.filepath = join(__dirname, '../../../../', filepath);
    }

    async getUsers() {
        try{
            const data = await fs.readFile(this.filepath, 'utf-8');
            const users = JSON.parse(data);
            return users;
        }catch(err){
            console.log(err);
            return []
        }
        
    }

    async getUser(id) {
        try{
            const data = await fs.readFile(this.filepath, 'utf-8');
            const users = JSON.parse(data);
            const user = users.find(user => user.id == id);
            if(!user){
                const error = new Error('Usuario no encontrado');
                throw error
            }
            return user;
        }catch(err){
            console.log(err);
            throw err
        }
    }
    async addUser(user) {
        try {
            const data = await fs.readFile(this.filepath, 'utf-8');
            const users = JSON.parse(data);
    
            const maxId = Math.max(...users.map(user => user.id)) || 0;
            const newUser = { id: maxId + 1, ...user };
            users.push(newUser);
    
            await fs.writeFile(this.filepath, JSON.stringify(users, null, 2), 'utf-8');
            console.log(`El usuario con id ${newUser.id} ha sido agregado`);
            const result = await this.getUser(newUser.id);
            return result;

        } catch (error) {
            console.log(error);
            throw error; 
        }
    } 

    async updateUser(id, body){
        try{
            const data = await fs.readFile(this.filepath, 'utf-8');
            const users = JSON.parse(data);
            const userIndex = users.findIndex(user => user.id == id);
            if(userIndex === -1){
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                throw error;
            }
            users[userIndex] = { ...users[userIndex], ...body };
            await fs.writeFile(this.filepath, JSON.stringify(users, null, 2), 'utf-8');
            console.log(`El usuario con id ${id} ha sido actualizado`);
        }catch(error){
            console.log(error);
            throw error; 
        }
    }

    async deleteUser(id) {
        try {
            const data = await fs.readFile(this.filepath, 'utf-8');
            const users = JSON.parse(data);
    
            const deletedUser = users.filter(user => user.id != id);
            fs.writeFile(this.filepath, JSON.stringify(deletedUser, null, 2), 'utf-8');
            console.log(`El usuario con id ${id} ha sido eliminado`);
            return deletedUser;

        } catch (error) {
            console.log(error);
        }
    } 

    async getUserByEmail(email){
        try{
            const data = await fs.readFile(this.filepath, 'utf-8');
            const users = JSON.parse(data);
            const user = users.find(user => user.email == email);
            if(!user){
                const user = null;
            }
            return user;
        }catch(err){
            console.log(err);
            throw error
        }
    }
}

export default usersManager

/* 
async function main() {
    const users = new usersManager('./users.json');
    
    try {
        await users.getUsers();
        await users.addUser({ name: 'Pedro', lastname: 'Perez' });
        await users.deleteUser(4);
    } catch (error) {
        console.log(error);
    }
}  

main(); */