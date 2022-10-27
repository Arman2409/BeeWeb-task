import fs from "fs";
import path from "path";

async function getUserImage(req, res) {
        fs.readFile(path.resolve(`./images/${req.body.filename}`), "base64",function(err, data) {
          if (err) throw err;
          res.end(data);   
        })
};

export default getUserImage;