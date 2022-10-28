import fs from "fs";
import path from "path";

import logger from "../tools/logger.js ";

async function getUserImage(req, res) {
        fs.readFile(path.resolve(`./images/${req.body.filename}`), "base64",function(err, data) {
          if (err) {
            logger.error(err.message)
          };
          res.end(data);   
        })
};

export default getUserImage;