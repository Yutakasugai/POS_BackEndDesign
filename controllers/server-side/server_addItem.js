const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// If user update for table 1, this exports will take user to update-1 page
exports.addItem = (req, res) => {

    console.log("User pressed a bext btn!"); 

    const {userName, date_key, time_key, table_key, c_number} = req.body; 
    console.log(userName, date_key, time_key, table_key, c_number); 

    // Just test to return a addpage on the window
    return res.render("addPage", {
        name: userName, 
        Date: date_key, 
        Time: time_key,
        table_key: table_key, 
        c_number: c_number
    }); 
}