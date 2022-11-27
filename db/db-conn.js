const mysql = require("mysql"); 
const dotenv = require("dotenv");

// dotenv.config({path : "./.env"}); 

//Create connection to database 
function db_conn(){

    const db = mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b2a454764cb73f', 
        password: '6eb564fe',
        database: 'heroku_719ef538f12f1bb'
    });

    return db; 
}

exports.db_conn = db_conn();


// Connect with my localhost server 
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER, 
//     password: process.env.DATABASE_PASS,
//     database: process.env.DATABASE
// });


// Coonect with heroku mysql server 
// const db = mysql.createConnection({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'b2a454764cb73f', 
//     password: '6eb564fe',
//     database: 'heroku_719ef538f12f1bb'
// });