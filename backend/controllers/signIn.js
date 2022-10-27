import jwt from "jsonwebtoken";
import searchUser from "../models/functions/Search.js";

async function signIn(req,res) {
        console.log(req.body);
        const loggingUser = req.body;
        const exists = await searchUser(loggingUser.username);
        if (exists.rowCount) {
            const user = exists.rows[0];
            console.log(user, loggingUser)
            if (user.password == loggingUser.password) {
                const accessToken = jwt.sign(user, process.env.SECRET_TOKEN)
                req.user = user;
                res.send(accessToken);
            } else {
                res.json({message: "Wrong password"});
            }
        } else {
            res.json({message: "Not found"});
        };
}

export default signIn;