import searchUser from "../models/functions/Search.js";
import insertUser from "../models/functions/Insert.js";

async function signUp(req, res){
    console.log(req.body);
    const exists = await searchUser(req.body.username);
    if (exists.rowCount) {
        res.json({message: "Already exists"});
        return;
    } 
    else {
      const insertion = await insertUser(req.body.name, req.body.username, req.body.password);
      if (insertion) {
         res.json({message: "User created"});
      } else {
        res.json({message: "Error occured"});
      };
    };
}

export default signUp;