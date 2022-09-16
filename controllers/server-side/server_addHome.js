const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Server Add Home Button Controller 
exports.addHome = (req, res) => {

    const {userName, date_key, time_key, table_key} = req.body; 
    // console.log(userName, date_key, time_key, table_key); 

    // Check the table status
    db.query(`select table_status from table_check where table_id = (?)`, (table_key), (error, result) => {
        if (error){
            console.log(error)
        } 

        if (result[0]["table_status"] === "empty") {

            // Drop two related tables
            db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                if (error){
                    console.log(error)
                }

                console.log("Two tables are dropped"); 
            })

            // Rest the customer number to null
            db.query(`UPDATE table_check SET num_customer = NULL WHERE table_id = (?)`, (table_key), (error) => {
                if(error) {
                    console.log(error)
                }

                console.log("Customer number was just reset!"); 
            })
        } 
    })

    // Pass the table condition to a next page, server home page
    db.query('select table_status from table_check', (error, result) => {
        if (error){
            console.log(error)
        }

        var table_arr = []

        for (let t = 0; t < result.length; t++) {

            table_arr.push(result[t]["table_status"]); 
        }

        // console.log(table_arr); 

        return res.render("server", { 
            name: userName, 
            Date: date_key, 
            Time: time_key, 
            table_arr: table_arr 
        })

    })
}