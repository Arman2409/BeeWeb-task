import pg from "pg";
const {Client} = pg;

const searchUser = async (userName) => {
    const client = new Client({
        database: "task",
        user: "postgres",
        password: "123",
        host: "0.0.0.0",
        port: 5432
    });
    await client.connect();  
    const users = await client.query(
            'SELECT * FROM users WHERE username = ($1)', [userName]
        );
    return users;
};

export default searchUser;