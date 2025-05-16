const fs = require('node:fs/promises');
const { get } = require('node:http');

class usersManager {
    constructor(filepath) {
        this.filepath = filepath;
    }

    async getUsers() {
        try{
            const data = await fs.readFile(this.filepath, 'utf-8');
            console.log(JSON.parse(data));
        }catch(err){
            console.log(err);
            return []
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
            this.getUsers();

        } catch (error) {
            console.log(error);
            throw error; 
        }
    } 
    async deleteUser(id) {
        try {
            const data = await fs.readFile(this.filepath, 'utf-8');
            const users = JSON.parse(data);
    
            const updatedUsers = users.filter(user => user.id !== id);
    
            fs.writeFile(this.filepath, JSON.stringify(updatedUsers, null, 2), 'utf-8');
            console.log(`El usuario con id ${id} ha sido eliminado`);
            this.getUsers();

        } catch (error) {
            console.log(error);
        }
    } 
}


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