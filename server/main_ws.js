const WebSocket = require("ws"); 
const dotenv = require("dotenv");

const db_conn = require("../db/db-conn"); 
const db = db_conn["db_conn"];

dotenv.config({path : "./.env"}); 

const wss = new WebSocket.Server({ port: process.env.WS_PORT })

wss.on("connection", function(ws){
    console.log("WebSocket is connected!")
    
    ws.on("message", function(data){

        wss.clients.forEach(function each(user){

            if(user !== ws && user.readyState === WebSocket.OPEN){

                // Check a passed value 
                let control_id = data.toString().split('%'); 

                if(control_id[0] === 'wait_permit') {

                    let username = control_id[1].split(':')[0]; 
                    let userpass = control_id[1].split(':')[1]; 

                    // Check the username and password
                    db.query(`select * from users where name = (?) and password = (?)`, [username, userpass], (error, check_result) => {
                        if (error) {
                            console.log(error); 
                        }

                        if (check_result.length > 0) {

                            if (check_result[0]['user_status'] === 'True') {
                                let error_key = `alreadyLog%${username}`;
                                return ws.send(error_key); 
                                // return user.send(error_key);
                            } else {
                                let passed_key = `passedID%${username}`; 
                                ws.send(passed_key); 
                                return user.send(passed_key);
                            }

                        } else {
                            return ws.send(`wrongKeys`); 
                        }
                    })

                } else if (control_id[0] === 'SA_submitBtn') {

                    if (control_id[1].includes('Phone') === true) {

                        // Extra Order for Phone Order
                        ws_submitItems(control_id[1], user, 'True', 'None', 'False'); 
                    } else {

                        // Rehular Orders
                        ws_submitItems(control_id[1], user, 'False', 'None', 'False'); 
                    }

                } else if (control_id[0] === 'SA_phoneBtn') {

                    let table_key = control_id[1].split('#')[0]; 
                    let time_key = control_id[1].split('#')[1]; 

                    console.log('SA_phoneBtn: ', table_key, time_key); 

                    ws_submitItems(table_key, user, 'True', time_key, 'False'); 

                } else if (control_id[0] === 'SV_doneBtn_Togo') {

                    console.log('Togo Order: done btn was clicked!'); 

                    ws_submitItems(control_id[1], user, 'False', 'None', 'True'); 

                } else {
                    // This is a general tone to send a data to any pages   
                    return user.send(data.toString()); 
                }
            } 
        }) 
    })
})

// Submit Items (Table 1-8)
function ws_submitItems (table_key, user, phone_key, time_key, togo_key) {

    const itemID_array = []; 
    const itemCheck_array = []; 
    const itemName_array = [];

    db.query(`select * from ${table_key} where order_status = 'unsubmit'`, (error, result_v1) => {
        if (error) {
            console.log(error); 
        }

        for (let i = 0; i < result_v1.length; i++) {

            itemID_array.push(result_v1[i]['id']); 

            let test_array = result_v1[i]['item_num'].split(',');

            for (let j = 0; j < test_array.length; j++) {

                let item_name = test_array[j].split(':')[1]; 
                itemName_array.push(item_name); 
                itemCheck_array.push(test_array[j]); 
            }
        }

        // Table_Check 
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

                        db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE id = (?)`, [update_num, result_v2[0]['id']], (error, test) => {
                            if(error) {
                                console.log(error); 
                            }
                        })
                    } else {
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

                db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name_v2), (error, result_v3) => {
                    if(error) {
                        console.log(error); 
                    }

                    if (result_v3.length > 0) {
                        let update_num = result_v3[0]['item_num'] + Number(item_number_v2); 

                        db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE id = (?)`, [update_num, result_v3[0]['id']], (error) => {
                            if(error) {
                                console.log(error); 
                            }
                        })
                    } else {
                        db.query(`insert into ${table_key}_Check (item_name, item_num) values (?, ?)`, [item_name_v2, item_number_v2], (error) => {
                            if (error) {
                                console.log(error);
                            }
                        })
                    }
                })
            }
        }

        if (phone_key === 'True' || togo_key === 'True') {

            // This is a Phone order
            db.query(`select * from togo_phone where table_id = (?)`, (table_key), (error, table_result) => {
                if(error){
                    console.log(error); 
                }

                if (table_result[0]['table_status'] === 'filled'){
                    let table_name = `Extra:${table_key}`; 

                    db.query(`insert into updated_table (table_name, table_id, EST, item_id) values (?, ?, ?, ?)`, [table_name, table_key, table_result[0]['EST'], itemID_array.join(':')], (error, result_v4) => {
                        if(error) {
                            console.log(error); 
                        }

                        let temp_result = Object.values(JSON.parse(JSON.stringify(result_v4)));

                        // Update kitchen_id on coming_orderdb
                        for (let i = 0; i < result_v1.length; i++) {
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
                            db.query(`update ${table_key} set order_status = "submit" where order_status = "unsubmit"`, (error) => {
                                if(error) {
                                    console.log(error);
                                }
                            })
                        })

                        submit_sendData(user); 
                    })

                } else {

                    if (phone_key === 'True') {

                        // Get pickUp time 
                        const cur_time = new Date();
                        cur_time.setMinutes(cur_time.getMinutes() + Number(time_key));
                        let final_time = cur_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 

                        let table_name = table_key; 

                        db.query(`insert into updated_table (table_name, table_id, EST, item_id) values (?, ?, ?, ?)`, [String(table_name), table_key, final_time, itemID_array.join(':')], (error, result_v5) => {
                            if(error) {
                                console.log(error); 
                            }

                            let temp_result = Object.values(JSON.parse(JSON.stringify(result_v5))); 

                            // Update kitchen_id on coming_orderdb
                            for (let i = 0; i < result_v1.length; i++) {
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
                                db.query(`update ${table_key} set order_status = "submit" where order_status = "unsubmit"`, (error) => {
                                    if(error) {
                                        console.log(error);
                                    }

                                    // Change the table status 
                                    db.query(`update togo_phone set table_status = "filled", EST = (?) where table_id = (?)`, [final_time, table_key], (error) => {
                                        if(error) {
                                            console.log(error); 
                                        }
                                    })
                                })
                            })

                            submit_sendData(user);
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
                                db.query(`update ${table_key} set order_status = "paid"`, (error) => {
                                    if(error) {
                                        console.log(error);
                                    }
    
                                    // Change the table status 
                                    db.query(`update togo_phone set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
                                        if(error) {
                                            console.log(error); 
                                        }
                                    })
                                })
                            })

                            submit_sendData(user); 
                        })
                    }
                }
            })

        } else {
            // This is a Regular order
            db.query(`select * from table_check where table_id = (?)`, (table_key), (error, table_result) => {
                if(error){
                    console.log(error); 
                }

                // Update pending_table in table_check
                db.query(`update table_check set pending_table = 'False' where table_id = (?)`, (table_key), (error) => {
                    if (error) {
                        console.log(error); 
                    }

                    if (table_result[0]['table_status'] === 'filled'){

                        let table_name = `Extra:${table_key}`; 

                        db.query(`insert into updated_table (table_name, table_id, item_id) values (?, ?, ?)`, [table_name, table_key, itemID_array.join(':')], (error, result_v6) => {
                            if(error) {
                                console.log(error); 
                            }

                            let temp_result = Object.values(JSON.parse(JSON.stringify(result_v6)));

                            // Update kitchen_id on coming_orderdb
                            for (let i = 0; i < result_v1.length; i++) {
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
                                    db.query(`update table_check set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
                                        if(error) {
                                            console.log(error); 
                                        }
                                    })
                                })
                            })

                            // Send Data 
                            submit_sendData(user); 
                        })

                    } else {

                        let table_name = table_key; 

                        db.query(`insert into updated_table (table_name, table_id, item_id) values (?, ?, ?)`, [String(table_name), table_key, itemID_array.join(':')], (error, result_v7) => {
                            if(error) {
                                console.log(error); 
                            }

                            let temp_result = Object.values(JSON.parse(JSON.stringify(result_v7))); 

                            // Update kitchen_id on coming_orderdb
                            for (let i = 0; i < result_v1.length; i++) {
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
                                    db.query(`update table_check set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
                                        if(error) {
                                            console.log(error); 
                                        }
                                    })
                                })
                            })

                            // Send Data
                            submit_sendData(user);  
                        })
                    }
                })
            })
        }
    })
}

// Get Updated Table Array 
function submit_sendData (user) {

    // Capture all values from updated_table as neeed 
    db.query(`select * from updated_table`, (error, main_result) => {
        if(error) {
            console.log(error); 
        }

        if (main_result.length > 0){
            const temp_array = []; 

            for (let i = 0; i < main_result.length; i++){
                let box_id = main_result[i]['id']; 
                let table_name = main_result[i]['table_name']; 
                let table_id = main_result[i]['table_id']; 
                let item_id = main_result[i]['item_id'].split(':').join(','); 
                let EST_val = main_result[i]['EST']; 

                db.query(`select * from ${table_id} where id IN(${item_id})`, (error, table_items) => {
                    if(error){
                        console.log(error); 
                    }

                    if (table_id.includes('Phone') === true) {
                        let phone_order = `${table_name}#${EST_val}`; 

                        if (table_items.length > 1) {
                            let b = ''; 

                            for (let j = 0; j < table_items.length; j++) {
                                b = `${b}!${table_items[j]['full_order']}`;

                                if (j === (table_items.length -1)){
                                    b = `${box_id}!${phone_order}${b}`; 
                                    temp_array.push(b); 
                                }
                            }
                        } else {
                            let a = `${box_id}!${phone_order}!${table_items[0]['full_order']}`; 
                            temp_array.push(a); 
                        }

                    } else {
                        if (table_items.length > 1) {
                            let b = ''; 

                            for (let j = 0; j < table_items.length; j++) {
                                b = `${b}!${table_items[j]['full_order']}`; 

                                if (j === (table_items.length -1)){
                                    b = `${box_id}!${table_name}${b}`; 
                                    temp_array.push(b);
                                }
                            }
                        } else {
                            let a = `${box_id}!${table_name}!${table_items[0]['full_order']}`; 
                            temp_array.push(a); 
                        }
                    }

                    if (i === (main_result.length-1)){
                        let total_result = `display_newItems%${temp_array.join(',')}`; 
                        return user.send(total_result); 
                    }
                })
            }
        } 
    })
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



