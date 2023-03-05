
const url='http://localhost:8000';

export  const uploadImage=(request,response)=>{

    console.log("request",request);
    //file must exist if not return from here
    if(!request.file){
        return response.status(404).json({msg:"File not found"});
    }
    // if file exist middleware will upload bedore uploadImage function called from route page
    // and we need to return image url 
    const imageUrl=`${url}/file/${request.file.filename}`;
    return response.status(200).json(imageUrl);


}