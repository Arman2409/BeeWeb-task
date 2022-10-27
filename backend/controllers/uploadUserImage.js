import updateUser from "../models/functions/Update.js";
import jwt from "jsonwebtoken";

async function uploadUserImage(req, res){
    const updated = await updateUser(req.user.username, "filename", req.file.filename);
    if (!updated) res.json({message: "Error occurred"})
    req.user.filename = req.file.filename;
    const newToken =  jwt.sign(req.user, process.env.SECRET_TOKEN)
    res.send({token: newToken})
}

export default uploadUserImage;