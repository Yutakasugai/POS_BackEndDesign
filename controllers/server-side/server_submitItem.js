const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Submit Btn Controller 
exports.submitItem = (req, res) => {

    const {userName, date_key, time_key, table_key, togo_key, phone_key, pickUp_time} = req.body; 

    // console.log("Submititem controller is here: " + phone_key); 

    if (togo_key === 'togo_key') {

        console.log("This is a togo order"); 

        db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, result) => {
            if (error) {
                console.log(error); 
            }

            return res.render('serverView', {
                name: userName, 
                Date: date_key, 
                Time: time_key, 
                table_key: table_key, 
                c_number: 1, 
                togo_key: "togo_key",
                submit_items: result
            })
        })

    } else {

        const itemID_array = []; 
        const itemCheck_array = []; 
        const itemName_array = [];

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

                let test_array = result[i]['item_num'].split(',');

                for (let j = 0; j < test_array.length; j++) {

                    let item_name = test_array[j].split(':')[1]; 
                    itemName_array.push(item_name); 
                    itemCheck_array.push(test_array[j]); 
                }
            }

            // Update table check db 
            if (result.length > 1) {

                let complete_array = clean_array(itemName_array, itemCheck_array); 

                for (let v = 0; v < complete_array.length; v++) {

                    let item_name_v2 = complete_array[v].split(':')[1]; 
                    let item_number_v2 = complete_array[v].split(':')[0]; 

                    // Insert some values into table check db
                    db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name_v2), (error, result) => {
                        if(error) {
                            console.log(error); 
                        }

                        if (result.length > 0) {

                            let update_num = result[0]['item_num'] + Number(item_number_v2); 

                            // This is the item already exsited in db 
                            db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE id = (?)`, [update_num, result[0]['id']], (error, test) => {
                                if(error) {
                                    console.log(error); 
                                }
                            })

                        } else {

                            // This is the first item to insert 
                            db.query(`insert into ${table_key}_Check (item_name, item_num) values (?, ?)`, [item_name_v2, item_number_v2], (error, test) => {
                                if (error) {
                                    console.log(error);
                                }
                            })
                        }
                    })
                } 

            } else {

                for (let v = 0; v < itemCheck_array.length; v++) {

                    let item_name_v2 = itemCheck_array[v].split(':')[1]; 
                    let item_number_v2 = itemCheck_array[v].split(':')[0]; 

                    // Insert some values into table check db
                    db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name_v2), (error, result) => {
                        if(error) {
                            console.log(error); 
                        }

                        if (result.length > 0) {

                            let update_num = result[0]['item_num'] + Number(item_number_v2); 

                            // This is the item already exsited in db 
                            db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE id = (?)`, [update_num, result[0]['id']], (error, test) => {
                                if(error) {
                                    console.log(error); 
                                }
                            })

                        } else {

                            // This is the first item to insert 
                            db.query(`insert into ${table_key}_Check (item_name, item_num) values (?, ?)`, [item_name_v2, item_number_v2], (error, test) => {
                                if (error) {
                                    console.log(error);
                                }
                            })
                        }
                    })
                } 
            }

            // Define if this order is phone order or not
            if (phone_key === 'phone_key') {

                db.query(`select * from togo_phone where table_id = (?)`, (table_key), (error, table_result) => {
                    if(error){
                        console.log(error); 
                    }

                    if (table_result[0]['table_status'] === 'filled'){

                        let table_name = `Extra:${table_key}`; 

                        console.log("This is EST for this box: ", table_result[0]['EST']); 

                        db.query(`insert into updated_table (table_name, table_id, EST, item_id) values (?, ?, ?, ?)`, [table_name, table_key, table_result[0]['EST'], itemID_array.join(':')], (error, result) => {
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

                    } else {
; 
                        // Get pickUp time 
                        const cur_time = new Date();
                        cur_time.setMinutes(cur_time.getMinutes() + Number(pickUp_time));
                        let final_time = cur_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 

                        let table_name = table_key; 

                        db.query(`insert into updated_table (table_name, table_id, EST, item_id) values (?, ?, ?, ?)`, [String(table_name), table_key, final_time, itemID_array.join(':')], (error, result) => {
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

                                    // Change the table status 
                                    db.query(`update togo_phone set table_status = "filled", EST = (?) where table_id = (?)`, [final_time, table_key], (error) => {
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
                    }
                })

            } else {

                // Insert values to updated_table
                db.query(`select * from table_check where table_id = (?)`, (table_key), (error, table_result) => {
                    if(error){
                        console.log(error); 
                    }

                    if (table_result[0]['table_status'] === 'filled'){

                        // console.log("This item is extra order"); 

                        let table_name = `Extra:${table_key}`; 

                        db.query(`insert into updated_table (table_name, table_id, item_id) values (?, ?, ?)`, [table_name, table_key, itemID_array.join(':')], (error, result) => {
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
                    
                                    // console.log("The order status changed to submit from unsubmit"); 

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
            }
        })
    }
}

// Make the array clear for table_check db
function clean_array (name_array, check_array) {

    const itemResutl_array = []; 

    let compare_array = [...new Set(name_array)];
    let temp_total = 0; 

    // Make the array clear 
    for (let h = 0; h < compare_array.length; h++) {

        let item = compare_array[h]; 
        
        for (let k = 0; k < check_array.length; k++) {

            let temp_name = check_array[k].split(':')[1]; 
            let temp_number = Number(check_array[k].split(':')[0]); 

            if (item === temp_name){

                temp_total = temp_total + temp_number; 
                // console.log(item, temp_total); 
            }
        }

        let item_result = `${temp_total}:${item}`; 
        itemResutl_array.push(item_result); 

        temp_total = 0; 
    }

    return itemResutl_array; 
}

