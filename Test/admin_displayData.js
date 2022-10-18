const url = require("url");
const db_conn = require("../db/db-conn"); 
const db = db_conn["db_conn"];

// function to display user choice data on the window
exports.displayData = (req, res) => {

    const {date_key, time_key, adminName, data} = req.body; 

    console.log(date_key, time_key, adminName, data); 

    res.send("Test page this"); 
}