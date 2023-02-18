import mongoose from "mongoose";

const Connection = async (username,password,database) => {
    // console.log(username,password,database);
const URL=`mongodb+srv://${username}:${password}@blog-app.hupr1o3.mongodb.net/${database}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true,useUnifiedTopology:true, })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;
