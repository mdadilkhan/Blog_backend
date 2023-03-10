import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

console.log("secretKey",process.env.ACCESS_SECRET_KEY);
export const authenticateToken = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  console.log("authHeader>>>",authHeader);
  console.log("substring>>>",authHeader.substring(7, authHeader.length));

  const token = authHeader.substring(7, authHeader.length);
  
  console.log("token>>>",token);
  
  if (token == null) {
    return response.status(401).json({ msg: "token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return response.status(401).json({ msg: "invalid token" });
    }
    request.user = user;
    next();
  });
};


// export const authenticateToken = (request, response, next) => {
//     const authHeader = request.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token == null) {
//         return response.status(401).json({ msg: 'token is missing' });
//     }

//     jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
//         if (error) {
//             return response.status(403).json({ msg: 'invalid token' })
//         }

//         request.user = user;
//         next();
//     })
// }
