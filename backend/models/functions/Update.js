import pg from "pg";
const {Client} = pg;

const updateUser = async (username, property, value) => {
    const client = new Client({
        database: "task",
        user: "postgres",
        password: process.env.DATABASE_PASSWORD,
        host: "0.0.0.0",
        port: 5432
    });
    await client.connect();  
    const updatedUser = await client.query(
            'UPDATE users SET filename = ($1) WHERE username = ($2) RETURNING *', [value, username]
        );
    return updatedUser;
};

export default updateUser;