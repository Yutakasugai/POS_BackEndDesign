const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Submit Btn Controller 
exports.submitItem = (req, res) => {

    const {userName, date_key, time_key, table_key} = req.body; 
    // console.log(userName, date_key, time_key, table_key, c_number); 

    const itemID_array = []; 

    // Capture unsubmitted values from table 
    db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, result) => {
        if (error) {
            console.log(error); 
        }

        // Trying to fix the submit action part abd insert id to updated_table 
        for (let i = 0; i < result.length; i++) {

            // Insert submit orders into coming_order db 
            db.query(`insert into coming_order(table_id, item_name, original_id) values(?, ?, ?)`, [table_key, result[i]['full_order'], result[i]['id']], (error) => {
                if(error) {
                    console.log(error); 
                }
            })

            itemID_array.push(result[i]['id']); 
        }

        // Insert values to updated_table
        db.query(`select * from table_check where table_id = (?)`, (table_key), (error, table_result) => {
            if(error){
                console.log(error); 
            }

            if (table_result[0]['table_status'] === 'filled'){

                console.log("This item is extra order"); 

                let table_name = `Extra:${table_key}`; 

                db.query(`insert into updated_table (table_name, table_id, item_id) values (?, ?, ?)`, [table_name, table_key, itemID_array.join(':')], (error, result) => {
                    if(error) {
                        console.log(error); 
                    }

                    let temp_result = Object.values(JSON.parse(JSON.stringify(result)));

                    console.log(temp_result[2]); 

                    // Change the order status
                    db.query(`update ${table_key} set kitchen_id = (?) where order_status = 'unsubmit'`, (temp_result[2]), (error) => {
                        if(error) {
                            console.log(error);
                        }

                        // Change the submit panel
                        db.query(`update ${table_key} set order_status = "submit"`, (error) => {
                            if(error) {
                                console.log(error);
                            }
            
                            // console.log("The order status changed to submit from unsubmit"); 

                            // Change the table status 
                            db.query(`update table_check set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
                                if(error) {
                                    console.log(error); 
                                }

                                // Go back to server main page
                                return res.redirect(url.format({
                                    pathname: '/serverHome',
                                    query: {
                                        "status": "Server_HomePage",
                                        "user": userName,
                                        "date": date_key, 
                                        "time": time_key, 
                                    }
                                }))
                            })
                        })
                    })
                })

            } else {

                console.log("This item is not extra order"); 

                let table_name = table_key; 

                db.query(`insert into updated_table (table_name, table_id, item_id) values (?, ?, ?)`, [String(table_name), table_key, itemID_array.join(':')], (error, result) => {
                    if(error) {
                        console.log(error); 
                    }

                    let temp_result = Object.values(JSON.parse(JSON.stringify(result))); 

                    // Change the order status
                    db.query(`update ${table_key} set kitchen_id = (?) where order_status = 'unsubmit'`, (temp_result[2]), (error) => {
                        if(error) {
                            console.log(error);
                        }

                        // Change the submit panel
                        db.query(`update ${table_key} set order_status = "submit"`, (error) => {
                            if(error) {
                                console.log(error);
                            }
            
                            console.log("The order status changed to submit from unsubmit"); 

                            // Change the table status 
                            db.query(`update table_check set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
                                if(error) {
                                    console.log(error); 
                                }

                                // console.log("The table status changed to filled from empty"); 

                                // Go back to server main page
                                return res.redirect(url.format({
                                    pathname: '/serverHome',
                                    query: {
                                        "status": "Server_HomePage",
                                        "user": userName,
                                        "date": date_key, 
                                        "time": time_key, 
                                    }
                                }))
                            })
                        })
                    })
                })
            }
        })
    })
}