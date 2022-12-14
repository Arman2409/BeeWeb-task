import express from "express";
import sessions from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import logger from "./tools/logger.js";
import upload from "./tools/multer.js";
import authenticateToken from "./tools/authenticate.js";

import signUp from "./controllers/signUp.js";
import signIn from "./controllers/signIn.js";
import uploadImage from "./controllers/uploadUserImage.js";
import getImage from "./controllers/getImage.js";
import serverRunning from "./controllers/serverRunning.js";

dotenv.config();
const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
}));
app.use((req, res, next) => {
    logger.silly(req.method + "  " + req.url);
    next();
});

// Routes

app.get('/', serverRunning);

app.post('/api/signIn', signIn );
app.post('/api/signUp', signUp );
app.post('/api/uploadUserImage' ,  upload.single("image"), authenticateToken, uploadImage);
app.post('/api/getUserImage', authenticateToken, getImage);

const port = process.env.PORT || 2000;
app.listen(port, () => logger.info(`App listening on port ${port}!`));