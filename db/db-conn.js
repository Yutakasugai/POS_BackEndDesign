const mysql = require("mysql"); 
const dotenv = require("dotenv");

dotenv.config({path : "./.env"}); 

//Create connection to database 
function db_conn(){

    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER, 
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE
    });

    return db; 
}

exports.db_conn = db_conn();
