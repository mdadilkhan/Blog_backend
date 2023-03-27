import express from 'express';
import Connection from './database/db.js ';
import mongoose from 'mongoose';
import env from "dotenv";
import cors from 'cors'
import bodyParser from 'body-parser';
import Router from './routes/route.js'




const app=express();
env.config();

//cors is an error when you accessing the request in two 
//diff ports browser send an error cors(cross origin resourse
//  sharing error,so we need to install cors package ans use app.use(cors());
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));



app.use('/',Router);


mongoose.set('strictQuery', false);//for deprication handle
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const database = process.env.MONGO_DB_DATABASE;

const PORT=process.env.PORT || 8000;

Connection(username, password, database);
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${process.env.PORT}`));



