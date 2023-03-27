import User from "../model/user.js";
import Token from "../model/token.js";
import bcrypt from 'bcrypt'
import env from 'dotenv'
import jwt from 'jsonwebtoken'


env.config();


export const signupUser= async (request,response) => {
    try {
        const hashedPassword=await bcrypt.hash(request.body.password,10);
        const user={
            name:request.body.name,
            username:request.body.username,
            password:hashedPassword
        }

        // const user=request.body;
       
        const newUser=new User(user);
        
       await newUser.save(); 
    
        
        return response.status(200).json({msg:"signup successfull"})
    } catch (error) {
       
        return response.status(500).json({msg:"error while signup"})
    }
}



export const loginUser= async (request,response)=>{
    let user=await User.findOne({username:request.body.username});
    
    if(!user){
        return response.status(400).json({msg:'Invalid username'})
    }
    try {
       let match = await bcrypt.compare(request.body.password,user.password);
       if(match){
        //do some jwt authentication
        const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
        const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);


          const newToken = new Token({token:refreshToken});
          await newToken.save();

          return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});
          
       }else{

        return response.status(400).json({msg:'Invalid Passowrd'});

       }
    } catch (error) {

       return response.status(500).json({msg:'error while login'})
       
    }

}

