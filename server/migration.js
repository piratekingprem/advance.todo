const mysql2 = require('mysql2');
const migration = require('mysql-migrations');
require('dotenv').config();

var connection = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
});


migration.init(connection, __dirname + '/src/api/migration', function () {
  console.log("finished running migrations");
});