import express from "express";
import sessions from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import jwt from "jsonwebtoken";


import logger from "./tools/logger.js";

const {Client} = pg;

const client = new Client({
    database: "task",
    user: "postgres",
    password: "pass",
    host: "localhost",
    port: 5432
});

const insertUser = async (userName) => {
    try {
        await client.connect();           // gets connection
        await client.query(
            `INSERT INTO "users" ("username")  
             VALUES ($1)`, [userName]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        console.log("inserted");
        await client.end();              // closes connection
    }
};

const searchUser = async (userName) => {
    try {
        await client.connect();           // gets connection
        const info = await client.query(
            'SELECT * FROM users WHERE username = ($1)', [userName]
        );
        await client.end();  
        return info;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        console.log("final search")
        // closes connection
    }
};
// client.connect((err) => {
//     if (err) throw err;
//     logger.info("Connected to database")
// })

dotenv.config();
const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
}));


app.get('/', (req, res) => res.send('Hello World!'));

app.post('/signIn', (req, res) => {
    console.log(req.body);
    const user = searchUser(req.body.username);
    console.log(user);
});

app.post('/signUp', (req, res) => {
    const exists = searchUser(req.body.username);
    if (exists.rowCount) {
        res.send("Already exists");
        return;
    } 
    else {
      const insertion = insertUser(req.body.username);
      console.log(insertion);
      req.send("User created");
    };
});

const port = 2000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));