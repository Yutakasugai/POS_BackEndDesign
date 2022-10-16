const { error } = require("console");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// If user update for table 1, this exports will take user to update-1 page
exports.addItem = (req, res) => {

    // console.log("User pressed a bext btn!"); 

    const {userName, date_key, time_key, table_key, c_number} = req.body; 

    // Make a connection to table_check db 
    db.query('select * from table_check where table_id = (?)', (table_key), (error, result) => {
        if (error){
            console.log(error)
        }

        // console.log(result[0]["table_status"]); 
        let c_num = String(c_number); 

        // Make sure the current table status from db 
        if (result[0]["table_status"] === "empty") {

            // Create a new table in db for the table num 
            db.query(`CREATE TABLE IF NOT EXISTS ${table_key} (id INT AUTO_INCREMENT PRIMARY KEY, full_order TEXT NOT NULL, main_item TEXT NOT NULL, other_pref TEXT, item_num TEXT NOT NULL, item_price TEXT NOT NULL, kitchen_id TEXT, order_status TEXT DEFAULT "unsubmit")`); 
            
            // Create another table to keep each item 
            db.query(`CREATE TABLE IF NOT EXISTS ${table_key}_Check (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_num INT NOT NULL)`); 

            // Insert customer number to table_check 
            db.query(`UPDATE table_check SET num_customer = ${c_num}, pending_table = 'True' WHERE table_id = (?)`, (table_key), (error) => {
                if(error) {
                    console.log(error)
                }
            })

            return res.redirect(url.format({
                pathname: '/addPage',
                query: {
                    "user": userName,
                    "date": date_key, 
                    "time": time_key, 
                    "table": table_key,
                    "c_num": c_number
                }
            }))

        } else {

            // Customer number is already filled
            db.query(`select * from table_check where table_id = (?)`, (table_key) ,(error, result) => {
                if(error){
                    console.log(error)
                }

                // Update the table status to Pending
                db.query(`UPDATE table_check SET pending_table = (?) WHERE table_id = (?)`, ['True', table_key], (error) => {
                    if(error) {
                        console.log(error); 
                    }
            
                    return res.redirect(url.format({
                        pathname: '/addPage',
                        query: {
                            "user": userName,
                            "date": date_key, 
                            "time": time_key, 
                            "table": table_key,
                            "c_num": result[0]["num_customer"]
                        }
                    }))
                })
            })
        }
    })
}


// Just test to return a addpage on the window
// return res.render("addPage", {
//     name: userName, 
//     Date: date_key, 
//     Time: time_key,
//     table_key: table_key, 
//     c_number: c_number
// }); 