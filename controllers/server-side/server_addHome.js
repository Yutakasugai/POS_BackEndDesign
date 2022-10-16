const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Server Add Home Button Controller 
exports.addHome = (req, res) => {

    const {userName, date_key, time_key, table_key, togo_key, phone_key} = req.body; 
    // console.log(userName, date_key, time_key, table_key, togo_key);
    
    if (togo_key === 'togo_key' || phone_key === 'phone_key'){

        db.query(`select * from togo_phone where table_id = (?)`, (table_key), (error, get_id) => {
            if (error) {
                console.log(error); 
            }

            if (get_id[0]['table_status'] === 'filled') {

                // console.log("This is add page after server click update btn"); 

                // Check if server is on the way to submit some items 
                db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, unsubmit_items) => {
                    if (error) {
                        console.log(error); 
                    }

                    if (unsubmit_items.length > 0) {

                        for (let t = 0; t < unsubmit_items.length; t++) {

                            // Remove the unsubmit items 
                            db.query(`delete from ${table_key} where id = (?)`, (unsubmit_items[t]['id']), (error) => {
                                if (error){
                                    console.log(error); 
                                }
                            })

                            return; 
                        }

                    } else {

                        console.log("Back to serverHome page again"); 

                        return; 
                    }
                })

            } else {

                // Drop two related tables
                db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                    if (error){
                        console.log(error)
                    }
                })

                // Delete the row from togo_phoen db
                db.query(`delete from togo_phone where table_id = (?)`, (table_key), (error) => {
                    if(error) {
                        console.log(error); 
                    }
                })  
                
                return; 
            }

        })

    } else {

        // Check the table status
        db.query(`select * from table_check where table_id = (?)`, (table_key), (error, result) => {
            if (error){
                console.log(error)
            } 

            // Update pending_table to False
            db.query(`update table_check set pending_table = 'False' where table_id = (?)`, (table_key), (error) => {
                if(error) {
                    console.log(error); 
                }
            })

            if (result[0]["table_status"] === "empty") {

                // Drop two related tables
                db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                    if (error){
                        console.log(error)
                    }
                    console.log("Two tables are dropped"); 
                })

                // Rest the customer number to null
                db.query(`UPDATE table_check SET num_customer = 'None' WHERE table_id = (?)`, (table_key), (error) => {
                    if(error) {
                        console.log(error)
                    }
                    console.log("Customer number was just reset!"); 
                })

                return; 

            } else {

                // Check if server is on the way to submit some items 
                db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, unsubmit_items) => {
                    if (error) {
                        console.log(error); 
                    }

                    if (unsubmit_items.length > 0) {

                        for (let t = 0; t < unsubmit_items.length; t++) {

                            // Remove the unsubmit items 
                            db.query(`delete from ${table_key} where id = (?)`, (unsubmit_items[t]['id']), (error) => {
                                if (error){
                                    console.log(error); 
                                }
                            })
                        }

                        return; 
                    } 
                })
            }
        })
    }

    // Back to Server Home Page
    return res.redirect(url.format({
        pathname: '/serverHome',
        query: {
            "user": userName,
            "date": date_key, 
            "time": time_key, 
            "table": table_key
        }
    }))
}