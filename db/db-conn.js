const mysql = require("mysql"); 
// const dotenv = require("dotenv");

// dotenv.config({path : "./.env"}); 

// Create connection to database 
function db_conn(){

    const db = mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b2a454764cb73f', 
        password: '6eb564fe',
        database: 'heroku_719ef538f12f1bb'
    });

    return db; 
}


// Create connection as a pool 
// function db_conn(){

//     const db = mysql.createPool({
//         host: 'us-cdbr-east-06.cleardb.net',
//         user: 'b2a454764cb73f', 
//         password: '6eb564fe',
//         database: 'heroku_719ef538f12f1bb'
//     });

//     return db; 
// }

exports.db_conn = db_conn();
