import dotenv from 'dotenv';

const path = process.cwd() + `/.env.${process.env.NODE_ENV}`;

dotenv.config({path});

export default {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    STORAGE: process.env.STORAGE,
    JWT_SECRET: process.env.JWT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
}