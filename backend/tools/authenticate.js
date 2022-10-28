import jwt from "jsonwebtoken";
import logger from "./logger.js";

function authenticateToken(req, res, next){
   jwt.verify(req.body.token, process.env.SECRET_TOKEN, (err, response) =>{
     if ( err ) {
       logger.error("Authentication error");
       res.json({message: "Authentication failed"});
     }
     req.user = response;
     next();
   })
}

export default authenticateToken;