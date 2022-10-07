const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.editItem = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, edit_item, edit_total_num, edit_key, togo_key, phone_key} = req.body; 

    // Array 
    const newItem_array = []; 
    const newItem_exTop = []; 
    const newItem_temp_array = []; 
    const newItem_array_total = []; 
    // const newItem_array_view = []; 
    const complete_array = []; 
    const item_array_plus = []; 
    const item_array_minus = []; 
    const complete_temp_array = []; 
    const oldItem_array = []; 
    const oldItem_temp_array = []; 


    let newItem_box = edit_item.split(','); 
    let newItem_name = newItem_box[0]; 

    // Check if the item is no cold ramen
    if(newItem_name === 'Cold') {

        console.log("This is a cold ramen, no with any pref"); 

    } else {

        // Define the main item and Push it to each array 
        let newItem_with_pref = `${newItem_name}${newItem_box[1]}`; 
        let newItem_num_name = `1:${newItem_name}`; 
        let newItem_main_total = `+:${edit_total_num}:${newItem_name}`;

        newItem_array.push(newItem_with_pref); 
        newItem_temp_array.push(newItem_num_name); 
        newItem_array_total.push(newItem_main_total); 

        // Make sure if the order comes with pref 
        if (newItem_box.length > 2) {
            
            for (let h = 2; h < newItem_box.length; h++) {

                // Capture only ex toppings 
                if(newItem_box[h].includes('+') === true) {

                    let exTop_text = newItem_box[h].substring(3); 
                    let exTop_num = newItem_box[h][1]; 
                    let exTop_result = `${exTop_num}:${exTop_text}`; 

                    let exTop_num_total = newItem_box[h][1] * edit_total_num; 
                    let exTop_result_total = `+:${exTop_num_total}:${exTop_text}`; 

                    newItem_temp_array.push(exTop_result);
                    newItem_array_total.push(exTop_result_total);  
                }

                newItem_array.push(newItem_box[h]); 
                newItem_exTop.push(newItem_box[h]);
                // newItem_array_view.push(newItem_box[h]); 
            }
    
        } 
    }

    // Make another array set for willRemove item 
    let oldItem_box = edit_key.split(':'); 
    let oldItem_id = oldItem_box[0]; 
    let oldItem_kitchenId = oldItem_box[1]
    let oldItem_name = oldItem_box[2]; 

    let oldItem_temp_name = oldItem_name
    .replace('[R]', '').replace('[L]', '')
    .replace('/[S]', '').replace('/[B]', ''); 

    let temp_name = `-:1:${oldItem_temp_name}`; 

    oldItem_array.push(oldItem_name); 
    oldItem_temp_array.push(temp_name); 

    // Check if the old item has some pref 
    if (oldItem_box[3] === '') {

        console.log("The is no with other pref"); 

    } else {

        for (let j = 3; j < oldItem_box.length; j++) {

            if(oldItem_box[j].includes('+') === true){
                let exTop_name_v2 = oldItem_box[j].substring(3); 
                let exTop_num_v2 = oldItem_box[j][1]; 
                let exTop_result_v2 = `-:${exTop_num_v2}:${exTop_name_v2}`; 

                oldItem_temp_array.push(exTop_result_v2); 
            }

            oldItem_array.push(oldItem_box[j]); 
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

                // console.log(temp_val2)

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

    // console.log('oldItem_temp_array is: ' + oldItem_temp_array); 
    // console.log('oldItem_array is: ' + oldItem_array); 
    // console.log('newItem_array is: ' + newItem_array);
    // console.log('newItem_temp_array: ' + newItem_temp_array); 
    // console.log('newItem_exTop is: ' + newItem_exTop);  
    // console.log(remove_add_array); 
    // console.log('id: ' + oldItem_id, '2nd_id: ' + oldItem_kitchenId); 
    // console.log("complete_array is: " + complete_array); 
    // console.log("remove_add_array is: " + remove_add_array); 
    // console.log("item_array_minus is: " + item_array_minus); 
    // console.log("item_array_plus is: " + item_array_plus); 
    // console.log("item_array_both is " + item_array_both); 
    // console.log("complete_temp_array is :" + complete_temp_array); 
    // console.log("\ncomplete_array is: " + complete_array); 

    // return res.send("I am testing this function now"); 

    // Insert a new item to table_check db
    let total_price = 0;
    const test_container = []; 

    for (let t = 0; t < newItem_temp_array.length; t++){

        let itemName = newItem_temp_array[t].split(':')[1];
        let itemNumber = newItem_temp_array[t].split(':')[0];

        db.query(`select * from Menu_List where item_name = (?)`, (itemName), (error, result) => {
            if(error){
                console.log(error); 
            }
            // console.log(result[0]['total_price']); 

            total_price = total_price + (result[0]['total_price'] * itemNumber);
            
            // console.log(total_price); 
            if (t === (newItem_temp_array.length - 1)){

                if (edit_total_num > 1){

                    if(newItem_exTop.length > 0){

                        for (let w = 0; w < edit_total_num; w++){
                            let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?, ?)`;
                            db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_exTop.join(':'), newItem_temp_array.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                                if(error){
                                    console.log(error); 
                                }

                                console.log(Object.values(JSON.parse(JSON.stringify(result)))[2], "This is the whole array: " + Object.values(JSON.parse(JSON.stringify(result)))[2]); 
                                let temp_id = Object.values(JSON.parse(JSON.stringify(result)))[2]; 

                                test_container.push(String(temp_id)); 
                                // console.log(test_container); 

                                if (w === (edit_total_num - 1)) {

                                    // Update updated_table db with new items 
                                    db.query(`select * from updated_table where id = (?)`, (oldItem_kitchenId), (error, result) => {
                                        if(error){
                                            console.log(error); 
                                        }

                                        // console.log(result[0]['item_id']); 
                                        let temp_array = result[0]['item_id'].split(':'); 
                                        let newID_array = temp_array.concat(test_container); 
                                        let remove_id = oldItem_id;  
                                        newID_array = newID_array.filter(item => item !== remove_id)

                                        // Update a new item id in updated_table
                                        db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                            if(error) {
                                                console.log(error)
                                            }
                                        })

                                        // Update coming_order table by the changed value 
                                        db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, ['Item Edited...', 'None', table_key, oldItem_id], (error) => {
                                            if (error) {
                                                console.log(error); 
                                            }
                                        })
                                    })
                                }
                            }); 
                        }

                    } else {

                        for (let w = 0; w < edit_total_num; w++){
                            let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?)`;
                            db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_temp_array.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                                if(error){
                                    console.log(error); 
                                }

                                console.log(Object.values(JSON.parse(JSON.stringify(result)))[2], "This is the whole array: " + Object.values(JSON.parse(JSON.stringify(result)))[2]); 

                                let temp_id = Object.values(JSON.parse(JSON.stringify(result)))[2];
                                test_container.push(String(temp_id)); 

                                if (w === (edit_total_num - 1)) {

                                    // Update updated_table db with new items 
                                    db.query(`select * from updated_table where id = (?)`, (oldItem_kitchenId), (error, result) => {
                                        if(error){
                                            console.log(error); 
                                        }

                                        // console.log(result[0]['item_id']); 
                                        let temp_array = result[0]['item_id'].split(':'); 
                                        let newID_array = temp_array.concat(test_container); 
                                        let remove_id = oldItem_id; 
                                        newID_array = newID_array.filter(item => item !== remove_id)

                                        // console.log(newID_array);  

                                        // Update a new item id in updated_table
                                        db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                            if(error) {
                                                console.log(error)
                                            }
                                        })

                                        // Update coming_order table by the changed value 
                                        db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, ['Item Edited...', 'None', table_key, oldItem_id], (error) => {
                                            if (error) {
                                                console.log(error); 
                                            }
                                        })
                                    })

                                }
                            }); 
                        }

                    }

                } else {

                    if(newItem_exTop.length > 0){

                        let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?, ?)`;
                        db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_exTop.join(':'), newItem_temp_array.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                            if(error){
                                console.log(error); 
                            }

                            console.log(Object.values(JSON.parse(JSON.stringify(result)))[2], "This is the whole array: " + Object.values(JSON.parse(JSON.stringify(result)))[2]); 

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

                                // console.log(newID_array); 

                                // Update a new item id in updated_table
                                db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                    if(error) {
                                        console.log(error)
                                    }
                                })
                            })

                            // Update coming_order table by the changed value 
                            db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, [newItem_array.join(':'), temp_id, table_key, oldItem_id], (error) => {
                                if (error) {
                                    console.log(error); 
                                }
                            })
                        }); 

                    } else {

                        let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price, kitchen_id, order_status) values(?, ?, ?, ?, ?, ?)`;
                        db.query(insert_sql, [newItem_array.join(':'), newItem_array[0], newItem_temp_array.join(','), total_price.toFixed(2), oldItem_kitchenId, 'submit'], (error, result) => {
                            if(error){
                                console.log(error); 
                            }

                            console.log(Object.values(JSON.parse(JSON.stringify(result)))[2], "This is the whole array: " + Object.values(JSON.parse(JSON.stringify(result)))[2]); 

                            let temp_id = Object.values(JSON.parse(JSON.stringify(result)))[2];
                            test_container.push(String(temp_id)); 

                            db.query(`select * from updated_table where id = (?)`, (oldItem_kitchenId), (error, result) => {
                                if(error){
                                    console.log(error); 
                                }

                                let temp_array = result[0]['item_id'].split(':'); 
                                let newID_array = temp_array.concat(test_container); 
                                let remove_id = oldItem_id;  
                                newID_array = newID_array.filter(item => item !== remove_id)

                                // console.log(newID_array); 

                                // Update a new item id in updated_table
                                db.query(`update updated_table set item_id = (?) where id = (?)`, [newID_array.join(':'), oldItem_kitchenId], (error) => {
                                    if(error) {
                                        console.log(error)
                                    }
                                })
                            })

                            // Update coming_order table by the changed value 
                            db.query(`UPDATE coming_order SET item_name = (?), original_id = (?) WHERE table_id = (?) AND original_id = (?)`, [newItem_array.join(':'), temp_id, table_key, oldItem_id], (error) => {
                                if (error) {
                                    console.log(error); 
                                }
                            })
                        }); 
                    }
                }
            }
        })
    }

    // Update Table_Check db for both new items and old items 
    for (let d = 0; d < complete_array.length; d++) {

        let plus_or_minus = complete_array[d].split(':')[0]; 
        let item_number = Number(complete_array[d].split(':')[1]); 
        let item_name = complete_array[d].split(':')[2]; 

        db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name), (error, result) => {
            if(error){
                console.log(error); 
            }

            console.log(result); 

            if (result.length > 0) {

                if (plus_or_minus === '+') {

                    let update_num = Number(result[0]['item_num']) + item_number; 

                    db.query(`update ${table_key}_Check set item_num = (?) where item_name = (?)`, [update_num, item_name], (error) => {
                        if (error) {
                            console.log(error); 
                        }
                    })

                } else {

                    let reduced_num = Number(result[0]['item_num']) - item_number; 

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

                    db.query(`insert into ${table_key}_Check(item_name, item_num) values(?, ?)`, [item_name, item_number], (error) => {
                        if (error) {
                            console.log(error); 
                        }
                    })

                } else {
                    
                    console.log("Somthing wrong... The item num should not be minus."); 
                }
            }
        })
    }

    // Remove the row of items from table db 
    db.query(`delete from ${table_key} where id = (?)`, (oldItem_id), (error) => {
        if(error) {
            console.log(error);
        }
    })

    if (togo_key === 'togo_key' || phone_key === 'phone_key') {

        // Return to Add Page 
        return res.redirect(url.format({
            pathname: '/addPage_Togo&Phone',
            query: {
                "status": "Server_AddPage",
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_key
            }
        })); 

    } else {

        // Back to server add page
        return res.redirect(url.format({
            pathname: '/addPage_Edit',
            query: {
                "status": "Server_AddPage",
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_key, 
                "c_num": c_number
            }
        }))
    }
}

