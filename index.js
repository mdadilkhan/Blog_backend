import express from 'express';
import Connection from './database/db.js ';
import mongoose from 'mongoose';
import env from "dotenv";
import Router from './routes/route.js'




const app=express();
env.config();

app.use('/',Router);


mongoose.set('strictQuery', false);//for deprication handle
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const database = process.env.MONGO_DB_DATABASE;
Connection(username, password, database);
app.listen(process.env.PORT, () => console.log(`Server is running successfully on PORT ${process.env.PORT}`));



