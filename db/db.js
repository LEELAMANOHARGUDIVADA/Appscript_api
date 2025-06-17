import mysql from "mysql2/promise"

let pool;
const connectDB = async() => {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
            waitForConnections: true,
            queueLimit: 0
        });
        console.log(pool);
        console.log("Database Connected");
    } catch (error) {
        console.log(error.message);
    }
}

export {pool, connectDB};