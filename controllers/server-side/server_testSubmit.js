const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Test submit 
exports.testSubmit = (req, res) => {
    
    const {userName, date_key, time_key, table_key, pickUp_time} = req.body; 

    console.log(userName, date_key, time_key, table_key, pickUp_time); 

    return res.send("This is a test page"); 
}