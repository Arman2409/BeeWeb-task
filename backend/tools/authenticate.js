import jwt from "jsonwebtoken";

function authenticateToken(req, res, next){
   jwt.verify(req.body.token, process.env.SECRET_TOKEN, (err, response) =>{
    console.log(err, response)
     if ( err ) res.json({message: "Autentication failed"})
     req.user = response;
     next();
   })
}

export default authenticateToken;