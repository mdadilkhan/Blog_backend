import grid from 'gridfs-stream'
import mongoose from 'mongoose';
 

// const url='http://localhost:8000';

const url='https://thankful-tam-foal.cyclic.app';

let gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
})

 
 

export  const uploadImage=(request,response)=>{


    //file must exist if not return from here
    if(!request.file){
        return response.status(404).json({msg:"File not found"});
    }
    // if file exist middleware will upload bedore uploadImage function called from route page
    // and we need to return image url 
    const imageUrl=`${url}/file/${request.file.filename}`;
    console.log(imageUrl);
    return response.status(200).json(imageUrl);
} 


export const getImage= async (request,response)=>{
   try {
      const file = await gfs.files.findOne({filename:request.params.filename});
      console.log(file);
      const readStream= gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(response);
   } catch (error) {
    return response.status(500).json({msg:error.message})
   }
}
     
