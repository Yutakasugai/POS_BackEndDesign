const express = require("express");
const path = require("path"); 
const ws = require("ws"); 
const http = require("http");

// const { Server } = require("ws");

// const {db} = require('./db/db-set'); 
// const {ws} = require('./server/main_ws'); 

// Set up to activate a broeser working 
const app = express();

// Define the current directory, and enable to interact with a public folder, which has css, js files and svg images
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory)); 

app.set('view engine', 'hbs'); 
// app.set(db, "mysql"); 
// app.set(ws, "ws"); 

app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 

app.use('/', require('./Pages/pages')); 
app.use('/auth', require('./routes/auth')); 

// Create a HTTP server for this system
const httpServer = http.createServer(app);
const wss = new ws.Server({ server: httpServer });

// WebSocket Main Console
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

                    ws_submitItems(table_key, user, 'True', time_key, 'False'); 

                } else if (control_id[0] === 'SV_doneBtn_Togo') {

                    ws_submitItems(control_id[1], user, 'False', 'None', 'True'); 

                } else if (control_id[0] === 'SA_removeBtn') {

                    ws_removeItems(control_id[1], user); 

                } else if (control_id[0] === 'SA_editBtn') {

                    ws_editItems(control_id[1], user); 

                } else if (control_id[0] === 'Admin_doneBtn') {

                    // console.log(control_id[1]); 

                    admin_doneBtn(control_id[1], user); 

                } else if (control_id[0] === 'SH_updateBtn') {

                    console.log('%%You just entered update btn websocket controller'); 

                    ws_updateBtn(control_id[1], user); 

                } else {
                    // This is a general tone to send a data to any pages   
                    return user.send(data.toString()); 
                }
            } 
        }) 
    })
})

// Define the port number which you are using 
const port = process.env.PORT || 3000; 

app.listen(port); 
console.log(`Server is listening on port ${port}`); 



// WebSocket - All Functions 
// Submit Items 
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

        // console.log(itemName_array, itemCheck_array); 

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

                        submit_sendData(user, 'None'); 
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

                            submit_sendData(user, 'None');
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

                            submit_sendData(user, 'None'); 
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
                            submit_sendData(user, 'None'); 
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
                            submit_sendData(user, 'None');  
                        })
                    }
                })
            })
        }
    })
}

// Remove Items 
function ws_removeItems (remove_key, user) {
    // Table_2#1:119:Shoyu[R]/[B]:(Ex Hard)
    // Table_1#3:20:+2{Egg(Side):

    // New Arrray 
    const removeItem_array = [];  

    let main_arr = remove_key.split('#'); 
    let table_key = main_arr[0]; 

    // Remove Key
    let arr = main_arr[1].split(':'); // -> 3:20:+2{Egg(Side):

    let removeItem_id = arr[0]; 
    let removeID_kitchen = arr[1]; 

    // Make a condition for Ex Toppiongs and Drinks 
    if (arr[2].includes('+') === true){
        console.log('This remove item is either extra topping or drink'); 

        let item_num = arr[2][1]; // -> 2
        let item_name = arr[2].substring(3).replace('(Side)', ''); // -> Egg
        let removeItem_name = `${item_num}:${item_name}`; 

        removeItem_array.push(removeItem_name); 
    } else {
        let removeItem_name = '1:' + arr[2]
        .replace('[R]', '').replace('[L]', '')
        .replace('/[S]', '').replace('/[B]', '')
        .replace('[S]', '').replace('[B]', ''); 

        removeItem_array.push(removeItem_name); 
    }

    // Capture all extra toppings and the number 
    if (arr.length > 3) {

        console.log('Remove item has some pref with it'); 
        for (let i = 3; i < arr.length; i++) {

            if (arr[i].includes('+') === true) {
                let exTop_text = arr[i].substring(3); 
                let exTop_num = arr[i][1]; 
                let exTop_result = `${exTop_num}:${exTop_text}`; 

                // console.log(exTop_result); 

                removeItem_array.push(exTop_result); 
            }
        }
    }

    // Table Check 
    for (let j = 0; j < removeItem_array.length; j++) {
        let item_number = Number(removeItem_array[j].split(':')[0]); 
        let item_name = removeItem_array[j].split(':')[1];

        console.log(item_number, item_name); 

        db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name), (error, result) => {
            if (error) {
                console.log(error); 
            }

            let update_num = Number(result[0]['item_num']) - item_number; 

            if (update_num > 0) {
                db.query(`update ${table_key}_Check set item_num = (?) where item_name = (?)`, [update_num, item_name], (error) => {
                    if (error) {
                        console.log(error); 
                    }
                })
            } else {
                db.query(`delete from ${table_key}_Check where item_name = (?)`, (item_name), (error) => {
                    if(error) {
                        console.log(error); 
                    }
                })
            }
        })
    }

    // Update Table 
    db.query(`select * from updated_table where id = (?)`, (removeID_kitchen), (error, result) => {
        if (error) {
            console.log(error); 
        }

        if (result.length === 0) {
            console.log('The order items are already served...'); 

        } else {

            let new_itemID_array = result[0]['item_id'].split(':'); 
            new_itemID_array = new_itemID_array.filter(item => item !== removeItem_id);

            if (new_itemID_array.length > 0) {
                db.query(`update updated_table set item_id = (?) where id = (?)`, [new_itemID_array.join(':'), removeID_kitchen], (error) => {
                    if(error) {
                        console.log(error); 
                    }

                    // Remove the item rwo from table db 
                    db.query(`delete from ${table_key} where id = (?)`, (removeItem_id), (error) => {
                        if(error) {
                            console.log(error); 
                        }

                        // Remove the item from coming_order db as well
                        db.query(`DELETE FROM coming_order WHERE table_id = (?) AND original_id = (?)`, [table_key, removeItem_id], (error) => {
                            if (error) {
                                console.log(error); 
                            }

                            submit_sendData(user, 'edit_key'); 
                        }) 
                    })
                })

            } else {

                console.log("This box bacame empty now..."); 

                // Delete the table row from updated_table
                db.query(`delete from updated_table where id = (?)`, (removeID_kitchen), (error) => {
                    if (error) {
                        console.log(error); 
                    }

                    // If the table is extra, check if there is still same table exsiting or not 
                    db.query(`select * from updated_table where table_id = (?)`, (table_key), (error, check_result) => {
                        if (error) {
                            console.log(error); 
                        }

                        if (check_result.length > 0) {

                            console.log('Pass 1'); 

                            // There are still same table order exsiting on the board 
                            db.query(`delete from ${table_key} where id = (?)`, (removeItem_id), (error) => {
                                if (error) {
                                    console.log(error); 
                                }

                                // Delete all table rows from coming_order db
                                db.query(`delete from coming_order where kitchen_id = (?)`, (removeID_kitchen), (error) => {
                                    if (error){
                                    console.log(error); 
                                    }

                                    db.query(`update table_check set pending_table = (?) where table_id = (?)`, ['False', table_key], (error) => {
                                        if (error) {
                                            console.log(error); 
                                        }

                                        submit_sendData(user, 'edit_key');
                                    })
                                })
                            })

                        } else {

                            console.log('Pass 2'); 

                            // No other same table not exsiting on the board
                            db.query(`delete from ${table_key} where id = (?)`, (removeItem_id), (error) => {
                                if (error) {
                                    console.log(error); 
                                }

                                // Delete all table rows from coming_order db
                                db.query(`delete from coming_order where kitchen_id = (?)`, (removeID_kitchen), (error) => {
                                    if (error){
                                    console.log(error); 
                                    }

                                    // Check if the table db still has items or not 
                                    db.query(`select * from ${table_key}`, (error, table_result) => {
                                        if (error) {
                                            console.log(error); 
                                        }

                                        if (table_result.length > 0) {

                                            console.log('Pass 3'); 
                                            // Items are still exsiting in this table 
                                            submit_sendData(user, 'edit_key');

                                        } else {

                                            console.log('Pass 4'); 

                                            // No items are gone from the table 
                                            db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                                                if (error) {
                                                    console.log(error); 
                                                }

                                                if (table_key.includes('Phone') === true || table_key.includes('Togo') === true) {
                                        
                                                    // delete the table row 
                                                    db.query(`delete from togo_phone where table_id = (?)`, (table_key), (error) => {
                                                        if (error) {
                                                            console.log(error); 
                                                        }
                            
                                                        submit_sendData(user, 'edit_key'); 
                                                    })
                                        
                                                } else {

                                                    console.log('Pass here!'); 
                                        
                                                    db.query(`update table_check set table_status = (?), pending_table = (?), num_customer = (?) where table_id = (?)`, ['empty', 'False', 'None', table_key], (error) => {
                                                        if (error) {
                                                            console.log(error); 
                                                        }
                            
                                                        submit_sendData(user, 'edit_key'); 
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    })
                })
            }
        }
    })
}

// Edit Item
function ws_editItems (key_values, user) {
    // Coming Items: 1:Miso[R]/[B]:(Ex Hard)!2:15:Shoyu[R]/[B]
    // Main => 1:Miso:[R]/[B]:(Ex Hard):+2{Egg
    // Side => 1:C.Plate:[B]
    // Side => 1:C.Don 
    // Result => SA_editBtn%Table_1!1:Shoyu[R]/[B]!1:3:Miso[R]/[B]:(Ex Hard):(More Oily)

    console.log(key_values); // Table_1!3:Shoulder(Side)!3:22:+2{Egg(Side)

    // Array 
    const newItem_array = []; 
    const newItem_temp_array = []; 
    const newItem_array_total = []; 
    const newItem_exTop = []; 

    const oldItem_array = []; 
    const oldItem_temp_array = []; 

    const item_array_plus = []; 
    const item_array_minus = []; 

    const complete_array = []; 
    const complete_temp_array = []; 

    // Test Array 
    const newItem_arr_test = []; 

    // Get number of loop array 
    const numberOfloop_array = []; 

    // Table Key 
    let table_key = key_values.split('!')[0]; 

    // Make array set for new items -> 3:Shoulder(Side)
    let newItem_arr = key_values.split('!')[1]; 

    if (newItem_arr.includes('[') === true && newItem_arr.includes(']') === true) {
        let newItem = newItem_arr.split(':')[1]
        .replace('[R]', '').replace('[L]', '')
        .replace('/[S]', '').replace('/[B]', '')
        .replace('[S]', '').replace('[B]', ''); 
        let newItem_num_name = `${newItem_arr.split(':')[0]}:${newItem}`; 
        let newItem_main_total = `+:${newItem_arr.split(':')[0]}:${newItem}`; 
        
        // Test 
        let newItem_single = `1:${newItem}`; 

        newItem_array.push(newItem_arr.split(':')[1]); 
        newItem_temp_array.push(newItem_num_name);
        newItem_array_total.push(newItem_main_total);  

        newItem_arr_test.push(newItem_single); 

        numberOfloop_array.push(newItem_arr.split(':')[0]); 

    } else if (newItem_arr.includes('(Side)') === true) {
        // Make array set for new items -> 3:Shoulder(Side) 2:Coke(Drink)
        console.log('This new item is extra toppings...'); 

        let newItem_id = newItem_arr.split(':'); 
        let newItem = `+${newItem_id[0]}{${newItem_id[1]}`; // +3{Shoulder(Side)

        newItem_array.push(newItem); 
        newItem_temp_array.push(newItem_arr.replace('(Side)', '')); 
        newItem_array_total.push(`+:${newItem_arr.replace('(Side)', '')}`); 

        newItem_arr_test.push(newItem_arr.replace('(Side)', ''));

        numberOfloop_array.push('1'); 

    } else if (newItem_arr.includes('Coke') === true || newItem_arr.includes('Sprite') === true || newItem_arr.includes('Iced Tea') === true || newItem_arr.includes('Asahi') === true || newItem_arr.includes('Sapporo') === true || newItem_arr.includes('Kokanee') === true) {
        console.log('This new item is drink items'); 

        // Value -> 2:Coke...
        let newItem_id = newItem_arr.split(':'); 
        let newItem = `+${newItem_id[0]}{${newItem_id[1]}`; // +2{Coke

        newItem_array.push(newItem); 
        newItem_temp_array.push(newItem_arr); 
        newItem_array_total.push(`+:${newItem_arr}`); 

        newItem_arr_test.push(newItem_arr);

        numberOfloop_array.push('1'); 

    } else {
        let newItem_num_name = `${newItem_arr.split(':')[0]}:${newItem_arr.split(':')[1]}`; 
        let newItem_main_total = `+:${newItem_arr.split(':')[0]}:${newItem_arr.split(':')[1]}`;

        // Test 
        let newItem_single = `1:${newItem_arr.split(':')[1]}`; // -> 1:S.Ban
        
        newItem_array.push(newItem_arr.split(':')[1]); 
        newItem_temp_array.push(newItem_num_name);
        newItem_array_total.push(newItem_main_total);  

        newItem_arr_test.push(newItem_single); // -> 1:Shoyu...

        numberOfloop_array.push(newItem_arr.split(':')[0]); 
    }

    // Count the other pref number 
    if (newItem_arr.split(':').length > 2) {
        // With extra toppings or some pref
        for (let i = 2; i < newItem_arr.split(':').length; i++) {
            if (newItem_arr.split(':')[i].includes('+') === true) {
                let exTop_name = newItem_arr.split(':')[i].substring(3); 
                let exTop_num = newItem_arr.split(':')[i][1]; 
                let exTop_result = `${exTop_num}:${exTop_name}`; 

                let exTop_num_total = exTop_num * newItem_arr.split(':')[0]; 
                let exTop_result_total = `+:${exTop_num_total}:${exTop_name}`; 

                newItem_temp_array.push(exTop_result);
                newItem_array_total.push(exTop_result_total); 

                newItem_arr_test.push(exTop_result); 
            }
            newItem_array.push(newItem_arr.split(':')[i]);
            newItem_exTop.push(newItem_arr.split(':')[i]); 
        }
    }

    // 3:22:+2{Egg(Side)
    let oldItem_arr = key_values.split('!')[2]; 

    // Item and Kitchen id 
    let oldItem_id = oldItem_arr.split(':')[0]; 
    let oldItem_kitchenId= oldItem_arr.split(':')[1]; 

    if (oldItem_arr.includes('[') === true && oldItem_arr.includes(']') === true) {
        // This has required pref
        let oldItem = oldItem_arr.split(':')[2]
        .replace('[R]', '').replace('[L]', '')
        .replace('/[S]', '').replace('/[B]', ''); 

        let oldItem_num_name = `-:1:${oldItem}`; 

        oldItem_array.push(oldItem_arr.split(':')[2]); 
        oldItem_temp_array.push(oldItem_num_name); 

    } else if (oldItem_arr.includes('(Side)') === true) {
        // 3:22:+2{Egg(Side)
        console.log('This old item is extra toppings'); 

        let oldItem = oldItem_arr.split(':')[2].replace('(Side)', ''); // +2{Egg
        let item_name = oldItem.substring(3); // Egg
        let item_num = oldItem[1]; 

        oldItem_array.push(item_name); 
        oldItem_temp_array.push(`-:${item_num}:${item_name}`);

    } else if (newItem_arr.includes('Coke') === true || newItem_arr.includes('Sprite') === true || newItem_arr.includes('Iced Tea') === true || newItem_arr.includes('Asahi') === true || newItem_arr.includes('Sapporo') === true || newItem_arr.includes('Kokanee') === true) {
        // 3:22:+2{Coke
        console.log('This value is drink items'); 

        let oldItem = oldItem_arr.split(':')[2]; // +2{Coke
        let item_name = oldItem.substring(3); // Coke
        let item_num = oldItem[1]; 

        oldItem_array.push(item_name); 
        oldItem_temp_array.push(`-:${item_num}:${item_name}`);

    } else {
        let oldItem_num_name = `-:1:${oldItem_arr.split(':')[2]}`;

        oldItem_array.push(oldItem_arr.split(':')[2]); 
        oldItem_temp_array.push(oldItem_num_name); 
    }

    if (oldItem_arr.split(':').length > 3) {
        for (let i = 3; i < oldItem_arr.split(':').length; i++) {
            if (oldItem_arr.split(':')[i].includes('+') === true) {
                let exTop_name_v2 = oldItem_arr.split(':')[i].substring(3); 
                let exTop_num_v2 = oldItem_arr.split(':')[i][1]; 
                let exTop_result_v2 = `-:${exTop_num_v2}:${exTop_name_v2}`; 

                oldItem_temp_array.push(exTop_result_v2); 
            }
            oldItem_array.push(oldItem_arr.split(':')[i]); 
        }
    }

    // To combine two array into one 
    const remove_add_array = newItem_array_total.concat(oldItem_temp_array); 

    // Make array for only name -> Output['Shoyu', 'Beans', 'Belly', 'Egg']
    for (let n = 0; n < newItem_array_total.length; n++) {

        let need_val = newItem_array_total[n].split(':')[2]; 
        item_array_plus.push(need_val); 
    }
    for (let w = 0; w < oldItem_temp_array.length; w++) {

        let need_val_v2 = oldItem_temp_array[w].split(':')[2]; 
        item_array_minus.push(need_val_v2); 
    }

    // Compare two array, minus and plus array, if they share same value between them
    for (let h = 0; h < newItem_array_total.length; h++) {
        let val1 = Number(newItem_array_total[h].split(':')[1]); 
        let val2 = newItem_array_total[h].split(':')[2];

        for (let y = 0; y < oldItem_temp_array.length; y++) {
            let temp_val1 =  Number(oldItem_temp_array[y].split(':')[1]); 
            let temp_val2 = oldItem_temp_array[y].split(':')[2];

            if (temp_val2 === val2) {
                
                if (val1 > temp_val1) {

                    let new_total_num = val1 - temp_val1; 
                    let result_val = `+:${new_total_num}:${temp_val2}`; 

                    complete_array.push(result_val); 
                    complete_temp_array.push(temp_val2); 

                } else if (val1 < temp_val1) {

                    let new_total_num = temp_val1 - val1;
                    let result_val = `-:${new_total_num}:${temp_val2}`;

                    complete_array.push(result_val);
                    complete_temp_array.push(temp_val2); 

                } else {

                    let result_val = `+:0:${temp_val2}`;

                    complete_array.push(result_val); 
                    complete_temp_array.push(temp_val2);

                }
            }
        }
    }

    // Make two array into one and Remove items existing in both of themm
    let item_array_both = item_array_minus.concat(item_array_plus); 
    item_array_both = item_array_both.filter(item => !complete_temp_array.includes(item));

    // Capture only values which do not exist on both array 
    for (let r = 0; r < remove_add_array.length; r++) {
        let item2 = remove_add_array[r].split(':')[2]; 

        for (let t = 0; t < item_array_both.length; t++) {

            let item_name_temp = item_array_both[t]; 
            if (item_name_temp === item2) {
                complete_array.push(remove_add_array[r]); 
            }
        }
    }

    console.log('newItem_arr_test: ' + newItem_arr_test); 
    console.log('newItem_array: ' + newItem_array);
    console.log('newItem_temp_array: ' + newItem_temp_array);
    console.log('newItem_array_total: ' + newItem_array_total);
    console.log('newItem_exTop: ' + newItem_exTop);
    console.log('oldItem_array: ' + oldItem_array);
    console.log('oldItem_temp_array: ' + oldItem_temp_array);
    console.log('item_array_plus: ' + item_array_plus);
    console.log('item_array_minus: ' + item_array_minus);
    console.log('complete_array: ' + complete_array);
    console.log('complete_temp_array: ' + complete_temp_array);


    // Table-Check 
    for (let i = 0; i < complete_array.length; i++) {

        let plus_or_minus = complete_array[i].split(':')[0]; 
        let item_num = Number(complete_array[i].split(':')[1]); 
        let item_name = complete_array[i].split(':')[2];

        db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name), (error, result) => {
            if(error){
                console.log(error); 
            }

            if (result.length > 0) {

                if (plus_or_minus === '+') {
                    let update_num = Number(result[0]['item_num']) + item_num; 

                    db.query(`update ${table_key}_Check set item_num = (?) where item_name = (?)`, [update_num, item_name], (error) => {
                        if (error) {
                            console.log(error); 
                        }
                    })
                } else {
                    let reduced_num = Number(result[0]['item_num']) - item_num;

                    if (reduced_num > 0) {
                        db.query(`update ${table_key}_Check set item_num = (?) where item_name = (?)`, [reduced_num, item_name], (error) => {
                            if (error){
                                console.log(error); 
                            }
                        })
                    } else {
                        db.query(`delete from ${table_key}_Check where item_name = (?)`, (item_name), (error) => {
                            if (error) {
                                console.log(error); 
                            }
                        })
                    }
                }
            } else {
                if (plus_or_minus === '+') {
                    db.query(`insert into ${table_key}_Check(item_name, item_num) values(?, ?)`, [item_name, item_num], (error) => {
                        if (error) {
                            console.log(error); 
                        }
                    })
                } else {
                    console.log("Somthing wrong... The item num should not be minus."); 
                    return; 
                }
            }
        })
    }

    // Update Menu_List and update_table 
    let total_price = 0;
    const test_container = [];  

    for (let t = 0; t < newItem_arr_test.length; t++){

        let itemName = newItem_arr_test[t].split(':')[1];
        let itemNumber = newItem_arr_test[t].split(':')[0];

        // console.log('Hello', itemName, itemNumber); 

        db.query(`select * from Menu_List where item_name = (?)`, (itemName), (error, result) => {
            if (error) {
                console.log(error); 
            }

            total_price = total_price + (result[0]['total_price'] * itemNumber);

            if (t === (newItem_arr_test.length - 1)){

                if (Number(numberOfloop_array[0]) > 1){

                    if(newItem_exTop.length > 0){

                        for (let w = 0; w < Number(numberOfloop_array[0]); w++){

                            let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?, ?)`;
                            db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_exTop.join(':'), newItem_arr_test.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                                if(error){
                                    console.log(error); 
                                }

                                let temp_id = Object.values(JSON.parse(JSON.stringify(result)))[2]; 
                                test_container.push(String(temp_id)); 

                                if (w === (Number(numberOfloop_array[0]) - 1)) {
                                    // Update updated_table db with new items 
                                    db.query(`select * from updated_table where id = (?)`, (oldItem_kitchenId), (error, result) => {
                                        if(error){
                                            console.log(error); 
                                        }

                                        let temp_array = result[0]['item_id'].split(':'); 
                                        let newID_array = temp_array.concat(test_container); 
                                        let remove_id = oldItem_id;  
                                        newID_array = newID_array.filter(item => item !== remove_id); 

                                        // Update a new item id in updated_table
                                        db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                            if(error) {
                                                console.log(error)
                                            }

                                            // Update coming_order table by the changed value 
                                            db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, ['Item Edited...', 'None', table_key, oldItem_id], (error) => {
                                                if (error) {
                                                    console.log(error); 
                                                }

                                                // Remove the row of items from table db 
                                                db.query(`delete from ${table_key} where id = (?)`, (oldItem_id), (error) => {
                                                    if(error) {
                                                        console.log(error);
                                                    }

                                                    submit_sendData(user, 'None'); 
                                                })
                                            })
                                        })
                                    })
                                }
                            })
                        }
                    } else {

                        for (let w = 0; w < Number(numberOfloop_array[0]); w++){
                            let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?)`;
                            db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_arr_test.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                                if(error){
                                    console.log(error); 
                                }

                                let temp_id = Object.values(JSON.parse(JSON.stringify(result)))[2];
                                test_container.push(String(temp_id)); 

                                if (w === (Number(numberOfloop_array[0]) - 1)) {
                                    // Update updated_table db with new items 
                                    db.query(`select * from updated_table where id = (?)`, (oldItem_kitchenId), (error, result) => {
                                        if(error){
                                            console.log(error); 
                                        }

                                        let temp_array = result[0]['item_id'].split(':'); 
                                        let newID_array = temp_array.concat(test_container); 
                                        let remove_id = oldItem_id; 
                                        newID_array = newID_array.filter(item => item !== remove_id);
                                        
                                        // Update a new item id in updated_table
                                        db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                            if(error) {
                                                console.log(error)
                                            }

                                            // Update coming_order table by the changed value 
                                            db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, ['Item Edited...', 'None', table_key, oldItem_id], (error) => {
                                                if (error) {
                                                    console.log(error); 
                                                }

                                                // Remove the row of items from table db 
                                                db.query(`delete from ${table_key} where id = (?)`, (oldItem_id), (error) => {
                                                    if(error) {
                                                        console.log(error);
                                                    }

                                                    submit_sendData(user, 'None'); 
                                                })
                                            })
                                        })
                                    })
                                }
                            })
                        }
                    }
                } else {

                    if(newItem_exTop.length > 0){

                        let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?, ?)`;
                        db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_exTop.join(':'), newItem_arr_test.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                            if(error){
                                console.log(error); 
                            }

                            let temp_id = Object.values(JSON.parse(JSON.stringify(result)))[2];
                            test_container.push(String(temp_id)); 

                            db.query(`select * from updated_table where id = (?)`, (oldItem_kitchenId), (error, result) => {
                                if(error){
                                    console.log(error); 
                                }

                                let temp_array = result[0]['item_id'].split(':'); 
                                let newID_array = temp_array.concat(test_container); 
                                let remove_id = oldItem_id; 
                                newID_array = newID_array.filter(item => item !== remove_id);

                                // Update a new item id in updated_table
                                db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                    if(error) {
                                        console.log(error)
                                    }

                                    // Update coming_order table by the changed value 
                                    db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, [newItem_array.join(':'), temp_id, table_key, oldItem_id], (error) => {
                                        if (error) {
                                            console.log(error); 
                                        }

                                        // Remove the row of items from table db 
                                        db.query(`delete from ${table_key} where id = (?)`, (oldItem_id), (error) => {
                                            if(error) {
                                                console.log(error);
                                            }

                                            submit_sendData(user, 'None'); 
                                        })
                                    })
                                })
                            })
                        })

                    } else {

                        let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?)`;
                        db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_arr_test.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                            if(error){
                                console.log(error); 
                            }

                            let temp_id = Object.values(JSON.parse(JSON.stringify(result)))[2];
                            test_container.push(String(temp_id)); 

                            db.query(`select * from updated_table where id = (?)`, (oldItem_kitchenId), (error, result) => {
                                if(error){
                                    console.log(error); 
                                }

                                let temp_array = result[0]['item_id'].split(':'); 
                                let newID_array = temp_array.concat(test_container); 
                                let remove_id = oldItem_id;  
                                newID_array = newID_array.filter(item => item !== remove_id); 

                                // Update a new item id in updated_table
                                db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                    if(error) {
                                        console.log(error)
                                    }

                                    // Update coming_order table by the changed value 
                                    db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, [newItem_array.join(':'), temp_id, table_key, oldItem_id], (error) => {
                                        if (error) {
                                            console.log(error); 
                                        }

                                        // Remove the row of items from table db 
                                        db.query(`delete from ${table_key} where id = (?)`, (oldItem_id), (error) => {
                                            if(error) {
                                                console.log(error);
                                            }

                                            submit_sendData(user, 'None'); 
                                        })
                                    })
                                })
                            })
                        })
                    }
                }
            }
        })
    }
}

// Update table or c_number from server Home 
function ws_updateBtn (key_value, user) {
    let arr = key_value.split(':'); 

    // Declare values 
    let old_tableID = arr[0]; 
    let new_c_number = arr[1]; 
    let new_table_key = arr[2]; 

    if (new_table_key === '0' && new_c_number !== '0') {
        // Only when the customer number is changed 

        db.query(`update table_check set num_customer = (?) where table_id = (?)`, [new_c_number, old_tableID], (error) => {
            if (error) {
                console.log(error); 
            }

            // No change on the kitchen side
            return; 
        })

    } else if (new_c_number === '0' && new_table_key !== '0') {
        // Only when the table number is changed 

        let new_tableID = `Table_${new_table_key}`; 

        db.query(`select * from table_check where table_id = (?)`, (new_tableID), (error, table_con) => {
            if (error) {
                console.log(error); 
            } 

            if (table_con[0]['table_status'] === 'filled') {
                console.log('The selected table is currently filled...'); 
                
                // No change on the kitchen side 
                return; 

            } else {
                console.log('This table is currently empty, good to switch to here'); 

                // Update table_check 
                db.query(`SELECT * FROM table_check WHERE table_id = (?)`, (old_tableID), (error, oldT_result) => {
                    if (error) {
                        console.log(error); 
                    }

                    db.query(`update table_check set table_status = 'filled', num_customer = (?) where table_id = (?)`, [oldT_result[0]['num_customer'], new_tableID], (error) => {
                        if (error) {
                            console.log(error); 
                        }

                        // Update the table check for old table 
                        db.query(`update table_check set table_status = 'empty', pending_table = 'False', num_customer = 'None' where table_id = (?)`, (old_tableID), (error) => {
                            if (error) {
                                console.log(error); 
                            }

                            // Rename main two tables
                            db.query(`rename table ${old_tableID} to ${new_tableID}`, (error) => {
                                if (error) {
                                    console.log(error); 
                                }
                                db.query(`rename table ${old_tableID}_Check to ${new_tableID}_Check`, (error) => {
                                    if (error) {
                                        console.log(error); 
                                    }
                                    // Update coming_order
                                    db.query(`UPDATE coming_order SET table_id = (?) WHERE table_id = (?)`, [new_tableID, old_tableID], (error) => {
                                        if (error) {
                                            console.log(error); 
                                        }

                                        // check if the table order is still on the kitchen
                                        db.query(`select * from updated_table where table_id = (?)`, (old_tableID), (error, result) => {
                                            if (error) {
                                                console.log(error); 
                                            }

                                            if (result.length > 0) {
                                                console.log('This table order exsit on the kitchen side'); 

                                                for (let i = 0; i < result.length; i++) {

                                                    if(result[i]['table_name'].includes('Extra:') === true) {
                                                        let new_Extable = `Extra:${new_tableID}`; 

                                                        // Update upadted_table 
                                                        db.query(`update updated_table set table_name = (?), table_id = (?) where id = (?)`, [new_Extable, new_tableID, result[i]['id']], (error) => {
                                                            if (error) {
                                                                console.log(error); 
                                                            }

                                                            if (i === (result.length-1)){
                                                                // This is a last loop 
                                                                submit_sendData(user, 'None'); 
                                                            }
                                                        })
                                                    } else {
                                                        db.query(`update updated_table set table_name = (?), table_id = (?) where id = (?)`, [new_tableID, new_tableID, result[i]['id']], (error) => {
                                                            if (error) {
                                                                console.log(error); 
                                                            }

                                                            if (i === (result.length-1)){
                                                                // This is a last loop 
                                                                submit_sendData(user, 'None'); 
                                                            }
                                                        })
                                                    }
                                                }
                                            } else {
                                                console.log('No table exsit on the kitchen side'); 
                                                return; 
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            } 
        })
    } else {
        // Both table num and customer num are changed 

        let new_tableID = `Table_${new_table_key}`; 

        db.query(`select * from table_check where table_id = (?)`, (new_tableID), (error, table_con) => {
            if (error) {
                console.log(error); 
            } 
    
            if (table_con[0]['table_status'] === 'filled') {
                console.log('The selected table is currently filled...'); 
                // Done

            } else {
                console.log('This table is currently empty, good to switch to here'); 

                db.query(`update table_check set table_status = 'filled', num_customer = (?) where table_id = (?)`, [new_c_number, new_tableID], (error) => {
                    if (error) {
                        console.log(error); 
                    }

                    // Update the table check for old table 
                    db.query(`update table_check set table_status = 'empty', pending_table = 'False', num_customer = 'None' where table_id = (?)`, (old_tableID), (error) => {
                        if (error) {
                            console.log(error); 
                        }

                        // Rename main two tables
                        db.query(`rename table ${old_tableID} to ${new_tableID}`, (error) => {
                            if (error) {
                                console.log(error); 
                            }
                            db.query(`rename table ${old_tableID}_Check to ${new_tableID}_Check`, (error) => {
                                if (error) {
                                    console.log(error); 
                                }
                                // Update coming_order
                                db.query(`UPDATE coming_order SET table_id = (?) WHERE table_id = (?)`, [new_tableID, old_tableID], (error) => {
                                    if (error) {
                                        console.log(error); 
                                    }

                                    // check if the table order is still on the kitchen
                                    db.query(`select * from updated_table where table_id = (?)`, (old_tableID), (error, result) => {
                                        if (error) {
                                            console.log(error); 
                                        }

                                        if (result.length > 0) {
                                            console.log('This table order exsit on the kitchen side'); 

                                            for (let i = 0; i < result.length; i++) {

                                                if(result[i]['table_name'].includes('Extra:') === true) {
                                                    let new_Extable = `Extra:${new_tableID}`; 

                                                    // Update upadted_table 
                                                    db.query(`update updated_table set table_name = (?), table_id = (?) where id = (?)`, [new_Extable, new_tableID, result[i]['id']], (error) => {
                                                        if (error) {
                                                            console.log(error); 
                                                        }

                                                        if (i === (result.length-1)){
                                                            // This is a last loop 
                                                            submit_sendData(user, 'None'); 
                                                        }
                                                    })
                                                } else {
                                                    db.query(`update updated_table set table_name = (?), table_id = (?) where id = (?)`, [new_tableID, new_tableID, result[i]['id']], (error) => {
                                                        if (error) {
                                                            console.log(error); 
                                                        }

                                                        if (i === (result.length-1)){
                                                            // This is a last loop 
                                                            submit_sendData(user, 'None'); 
                                                        }
                                                    })
                                                }
                                            }
                                        } else {
                                            console.log('No table exsit on the kitchen side'); 
                                            return; 
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    }
}

// Get Updated Table Array 
function submit_sendData (user, option_id) {

    // Capture all values from updated_table as neeed 
    db.query(`select * from updated_table`, (error, main_result) => {
        if(error) {
            console.log(error); 
        }

        // console.log(main_result);
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

                        if (option_id === 'edit_key') {
                            let total_result = `display_editItems%${temp_array.join(',')}`; 
                            return user.send(total_result); 
                        } else {
                            let total_result = `display_newItems%${temp_array.join(',')}`; 
                            return user.send(total_result); 
                        }
                    }
                })
            }

        } else {

            // Only happend when remove or edit items 
            let total_result = `display_editItems%None`; 
            return user.send(total_result); 
        }
    })
}

// Done Btn: Kitchen Side
function admin_doneBtn(key_data, user) {

    // console.log(key_data); 

    let kitchen_id = key_data.split('#')[0]; 
    let table_id = key_data.split('#')[1].replace('Extra:', '');

    // console.log(kitchen_id, table_id); 
    
    if (table_id.includes('Phone') === true) {

        // Insert done items to order_result table
        db.query(`select * from updated_table where id = (?)`, (kitchen_id), (error, est_val) =>{
            if(error) {
                console.log(error); 
            }

            db.query(`select * from ${table_id} where kitchen_id = (?)`, (kitchen_id), (error, result) => {
                if (error) {
                    console.log(error); 
                }

                for (let i = 0; i < result.length; i++) {
                    // Insert all item values to order_result db
                    db.query(`insert into order_result(table_name, EST, order_item) values(?, ?, ?)`, [table_id, est_val[0]['EST'], result[i]['full_order']], (error) => {
                        if(error) {
                            console.log(error); 
                        }
                    })
                }
            })
        })

        // Remove the items from exsiting tables
        db.query(`delete from coming_order where kitchen_id = (?)`, (kitchen_id), (error) => {
            if (error) {
                console.log(error); 
            }

            // Delete the order box from updated_table
            db.query(`delete from updated_table where id = (?)`, (kitchen_id), (error) => {
                if (error) {
                    console.log(error); 
                }

                // Check if extra order from the same table exist on the borad 
                db.query(`select * from updated_table where table_id = (?)`, (table_id), (error, result) => {
                    if (error) {
                        console.log(error); 
                    }

                    if (result.length > 0) {
                        // Still exist 
                        let data = `Admin_doneBtn%${kitchen_id}:${table_id}:None`; 
                        return user.send(data); 

                    } else {

                        // Check order status 
                        db.query(`select * from ${table_id} where order_status = "submit"`, (error, unpaid_items) => {
                            if (error) {
                                console.log(error); 
                            } 

                            if (unpaid_items.length > 0) {
                                // Some items are not paid yet
                                let data = `Admin_doneBtn%${kitchen_id}:${table_id}:None`; 
                                return user.send(data);

                            } else {
                                // All items are paid and ready to remove
                                let data = `Admin_doneBtn%${kitchen_id}:${table_id}:Done`; 
                                return user.send(data);
                            }
                        })
                    }
                })
            })
        })

    } else {

        // Insert new items to order_result table 
        db.query(`select * from ${table_id} where kitchen_id = (?)`, (kitchen_id), (error, result) => {
            if (error) {
                console.log(error); 
            }

            for (let i = 0; i < result.length; i++) {
                // Insert all item values to order_result db
                db.query(`insert into order_result(table_name, order_item) values(?, ?)`, [table_id, result[i]['full_order']], (error) => {
                    if(error) {
                        console.log(error); 
                    }
                })
            }
        })

        // Remove the items from exsiting tables
        db.query(`delete from coming_order where kitchen_id = (?)`, (kitchen_id), (error) => {
            if (error) {
                console.log(error); 
            }

            // Delete the order box from updated_table
            db.query(`delete from updated_table where id = (?)`, (kitchen_id), (error) => {
                if (error) {
                    console.log(error); 
                }

                // Check if extra order from the same table exist on the borad 
                db.query(`select * from updated_table where table_id = (?)`, (table_id), (error, result) => {
                    if (error) {
                        console.log(error); 
                    }

                    if (result.length > 0) {
                        // Still exist 
                        let data = `Admin_doneBtn%${kitchen_id}:${table_id}:None`; 
                        return user.send(data); 

                    } else {
                        // No exist, can click done button 
                        let data = `Admin_doneBtn%${kitchen_id}:${table_id}:Done`; 
                        return user.send(data); 
                    }
                })
            })
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

