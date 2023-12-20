const mysql = require('mysql2/promise');
require("dotenv").config();

async function query(sql,params) {
    const db = {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
    const connection = await mysql.createConnection(db);
    const [results,] = await connection.execute(sql, params);
    connection.end();
    return results;
}

module.exports = {
    query
}