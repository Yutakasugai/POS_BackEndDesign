const { error } = require("console");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// If user update for table 1, this exports will take user to update-1 page
exports.addItem = (req, res) => {

    console.log("User pressed a bext btn!"); 

    const {userName, date_key, time_key, table_key, c_number} = req.body; 
    // console.log(table_key, c_number); 

    // Make a connection to table_check db 
    db.query('select table_status from table_check where table_id = (?)', (table_key), (error, result) => {
        if (error){
            console.log(error)
        }

        let c_num = String(c_number); 

        // Make sure the current table status from db 
        if (result[0]["table_status"] === "empty") {

            // Create a new table in db for the table num 
            db.query(`CREATE TABLE IF NOT EXISTS ${table_key} (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_price TEXT NOT NULL, order_status TEXT DEFAULT "unsubmit")`); 
            
            // Create another table to keep each item 
            db.query(`CREATE TABLE IF NOT EXISTS ${table_key}_Check (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_num INT NOT NULL)`); 

            // Insert customer number to table_check 
            db.query(`UPDATE table_check SET num_customer = ${c_num} WHERE table_id = (?)`, (table_key), (error) => {
                if(error) {
                    console.log(error)
                }

                console.log("Num customer was updated at the table key."); 
            })

            // Just test to return a addpage on the window
            return res.render("addPage", {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                c_number: c_number
            }); 

        } else {

            // Customer number is already filled
            db.query(`select num_customer from table_check where table_id = ${table_key}`, (error, result) => {
                if(error){
                    console.log(error)
                }

                // Just test to return a addpage on the window
                return res.render("addPage", {
                    name: userName, 
                    Date: date_key, 
                    Time: time_key,
                    table_key: table_key, 
                    c_number: result[0]["num_customer"]
                }); 

            })
        }
    })

    // Flip the panel of table_check db
    // db.query(`UPDATE table_check SET table_status = "process" WHERE table_id = (?)`, (table_key), (error) => {
    //     if (error){
    //         console.log(error)
    //     }

    //     console.log("table status was updated!"); 
    // })
}