import pg from "pg";
const {Client} = pg;

const insertUser = async (name, username, password) => {
    const client = new Client({
        database: "task",
        user: "postgres",
        password: "123",
        host: "0.0.0.0",
        port: 5432
    });
   await client.connect()
   await client.query(
            `INSERT INTO "users" ("name", "username", "password")  
            VALUES ($1, $2, $3)`, [name ,username, password]);
   return true;
};

export default insertUser;