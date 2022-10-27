import express from "express";
import sessions from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import fs from "fs";
import { encode } from "node-base64-image";

import logger from "./tools/logger.js";
import upload from "./tools/multer.js";
import authenticateToken from "./tools/authenticate.js";

import signUp from "./controllers/signUp.js";
import signIn from "./controllers/signIn.js";
import uploadImage from "./controllers/uploadUserImage.js";
import getImage from "./controllers/getImage.js";

dotenv.config();
const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
}));
app.use((req, res, next) => {
    logger.silly(req.url);
    next();
});

// Routes

app.get('/', (req, res) => res.send('Server running!'));

app.post('/api/signIn', signIn );
app.post('/api/signUp', signUp );
app.post('/api/uploadUserImage' ,  upload.single("image"), authenticateToken, uploadImage);
app.post('/api/getUserImage', authenticateToken, getImage);

const port = 2000;
app.listen(port, () => logger.info(`App listening on port ${port}!`));