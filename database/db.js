import mongoose from "mongoose";
import env from 'dotenv'

env.config();

const Connection = async (username,password,database) => {

const URL=process.env.DATABASE;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true,useUnifiedTopology:true, })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;
