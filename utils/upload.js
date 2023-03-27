//image is in binary format so we are creating a middleware to convert into desired format using library
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import env from 'dotenv';


env.config();


const username=process.env.MONGO_DB_USER;
const password=process.env.MONGO_DB_PASSWORD;
const database=process.env.MONGO_DB_DATABASE;


//GridfsStorage is a storage 
//it take 1 arguments as an object
//object consist of three things 
//1st mongodb connection url but as an object it takes
//options
//file

const storage=new GridFsStorage({
     url: `mongodb+srv://${username}:${password}@blog-app.hupr1o3.mongodb.net/${database}?retryWrites=true&w=majority`,
     options:{useNewUrlParser:true},
     file:(request,file)=>{
 
        const match=["image/png","image/jpg","image/jpeg"];
          if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-blogX-${file.originalname}`;
          }
          return {
            bucketName:"photos",
            flename: `${Date.now()}-blogX-${file.originalname}`
          }
     }
})


//now we need multer to upload image 
//it helps is uploading file iin mongodb daatabase
// used as a middleware

export default multer({storage});