const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// View Done Button Controller
exports.viewDone = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, togo_key, phone_key} = req.body; 

    // Make if this order sheet is togo or phone
    if (togo_key === 'togo_key') {

        // Capture unsubmitted values from table 
        const itemID_array = []; 
        const itemCheck_array = []; 
        const itemName_array = [];

        db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, result_v1) => {
            if (error) {
                console.log(error); 
            }

            // Trying to fix the submit action part abd insert id to updated_table 
            for (let i = 0; i < result_v1.length; i++) {

                // Insert submit orders into coming_order db 
                // db.query(`insert into coming_order(table_id, item_name, original_id) values(?, ?, ?)`, [table_key, result_v1[i]['full_order'], result_v1[i]['id']], (error) => {
                //     if(error) {
                //         console.log(error); 
                //     }
                // })

                itemID_array.push(result_v1[i]['id']); 

                let test_array = result_v1[i]['item_num'].split(',');

                for (let j = 0; j < test_array.length; j++) {

                    let item_name = test_array[j].split(':')[1]; 
                    itemName_array.push(item_name); 
                    itemCheck_array.push(test_array[j]); 
                }
            }

            if (result_v1.length > 1) {

                let complete_array = clean_array(itemName_array, itemCheck_array); 

                for (let v = 0; v < complete_array.length; v++) {

                    let item_name_v2 = complete_array[v].split(':')[1]; 
                    let item_number_v2 = complete_array[v].split(':')[0]; 

                    // Insert some values into table check db
                    db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name_v2), (error, result_v2) => {
                        if(error) {
                            console.log(error); 
                        }

                        if (result_v2.length > 0) {

                            let update_num = result_v2[0]['item_num'] + Number(item_number_v2); 

                            // This is the item already exsited in db 
                            db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE id = (?)`, [update_num, result_v2[0]['id']], (error, test) => {
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
                    db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name_v2), (error, result_v3) => {
                        if(error) {
                            console.log(error); 
                        }

                        if (result_v3.length > 0) {

                            let update_num = result_v3[0]['item_num'] + Number(item_number_v2); 

                            // This is the item already exsited in db 
                            db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE id = (?)`, [update_num, result_v3[0]['id']], (error, test) => {
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

            // Insert values to updated_table
            db.query(`select * from togo_phone where table_id = (?)`, (table_key), (error, table_result) => {
                if(error){
                    console.log(error); 
                }

                if (table_result[0]['table_status'] === 'filled'){

                    let table_name = `Extra:${table_key}`; 

                    db.query(`insert into updated_table (table_name, table_id, item_id) values (?, ?, ?)`, [table_name, table_key, itemID_array.join(':')], (error, result_v4) => {
                        if(error) {
                            console.log(error); 
                        }

                        let temp_result = Object.values(JSON.parse(JSON.stringify(result_v4)));

                        // Update kitchen id in coming_order db
                        for (let i = 0; i < result_v1.length; i++) {
                            db.query(`insert into coming_order(table_id, item_name, original_id, kitchen_id) values(?, ?, ?, ?)`, [table_key, result_v1[i]['full_order'], result_v1[i]['id'], temp_result[2]], (error) => {
                                if(error) {
                                    console.log(error); 
                                }
                            })
                        }

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
                                db.query(`update togo_phone set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
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

                    db.query(`insert into updated_table (table_name, table_id, item_id) values (?, ?, ?)`, [table_key, table_key, itemID_array.join(':')], (error, result_v5) => {
                        if(error) {
                            console.log(error); 
                        }

                        let temp_result = Object.values(JSON.parse(JSON.stringify(result_v5))); 

                        // Update kitchen id on coming order db
                        for (let i = 0; i < result_v1.length; i++) {
                            // Update kitchen id in coming_order db
                            db.query(`insert into coming_order(table_id, item_name, original_id, kitchen_id) values(?, ?, ?, ?)`, [table_key, result_v1[i]['full_order'], result_v1[i]['id'], temp_result[2]], (error) => {
                                if(error) {
                                    console.log(error); 
                                }
                            })
                        }

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
                                db.query(`update togo_phone set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
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
        })

    } else {

        // Update pending_table in table_check 
        // db.query(`update `)

        // Update item number in Menu List db
        db.query(`select * from ${table_key}_Check`, (error, result) => {
            if(error) {
                console.log(error); 
            }
            // console.log(result);
            for (let i = 0; i < result.length; i++) {

                let item_name = result[i]['item_name']; 
                let item_num = Number(result[i]['item_num']); 

                db.query(`select * from Menu_List where item_name = (?)`, (item_name), (error, result_v2) => {
                    if (error) {
                        console.log(error); 
                    }

                    let update_num = Number(result_v2[0]['num_item']) + item_num;
                    
                    // console.log(update_num);
                    db.query(`update Menu_List set num_item = (?) where item_name = (?)`, [update_num, item_name], (error) => {
                        if(error) {
                            console.log(error); 
                        }
                    })
                })
            }

            // Remove all data related to this table db 
            db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                if(error) {
                    console.log(error); 
                }
            })

            // Remove the item from coming_order db as well
            // db.query(`DELETE FROM coming_order WHERE table_id = (?)`, (table_key), (error) => {
            //     if (error) {
            //         console.log(error); 
            //     }
            // }) 

            if (phone_key === 'phone_key') {

                // Update customer_result db
                db.query(`insert into customer_result(table_id, num_customer) values(?, ?)`, [table_key, '1'], (error) => {
                    if (error) {
                        console.log(error); 
                    }
                })

                db.query(`delete from togo_phone where table_id = (?)`, (table_key), (error) => {
                    if (error) {
                        console.log(error); 
                    }

                    return; 
                })
            } else {

                // Update customer_result db
                db.query(`insert into customer_result(table_id, num_customer) values(?, ?)`, [table_key, c_number], (error) => {
                    if (error) {
                        console.log(error); 
                    }
                })

                db.query(`update table_check set table_status = (?), num_customer = (?) where table_id = (?)`, ['empty', 'None', table_key], (error) => {
                    if (error) {
                        console.log(error); 
                    }

                    return; 
                })
            }

            // Back to server add page
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
