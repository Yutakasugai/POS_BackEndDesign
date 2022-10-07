const { type } = require("os");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.insertItem = (req, res) => {

    // console.log("This is a test controller to insert items"); 

    const {userName, date_key, time_key, table_key, c_number, added_item, total_num, togo_key, phone_key} = req.body; 

    // console.log(added_item, total_num);

    var item_array = added_item.split(','); 
    var item_length = item_array.length;
    let item_name = item_array[0]; 

    // Pack only extra toppings to this array
    const temp_array = []; 
    const temp_price_array = []; 
    const otherPref_array = []; 
    const makePrice_array = []; 

    // Check the item name 
    if (item_name === 'Cold') {

        console.log("This is a cold ramen with no soup and meat pref"); 
        temp_array.push(item_name);

        // Make a new array for extra toppings if needed
        if (item_length > 1) {

            // console.log("There is something extra orders or options"); 

            for (let k = 2; k < item_length; k++) {

                // console.log(item_array[k]); 
                if (item_array[k].includes('+') === true) {

                    let char_text = item_array[k].substring(3);
                    let number_item = item_array[k][1]; 
                    let exTop_text = `${number_item}:${char_text}`; 

                    // console.log(exTop_text); 
                    exTop_array.push(exTop_text); 
                }

                temp_array.push(item_array[k]); 
                otherPref_array.push(item_array[k]); 
            }
        }

    } else {

        let item_with_pref = `${item_array[0]}${item_array[1]}`; 
        let mainItem = `${total_num}:${item_name}`; 
        let mainItem_v2 = `1:${item_name}`; 
        temp_array.push(item_with_pref);
        temp_price_array.push(mainItem_v2); 
        makePrice_array.push(mainItem); 

        // Make a new array for extra toppings if needed
        if (item_length > 2) {

            // console.log("There is something extra orders or options"); 

            for (let k = 2; k < item_length; k++) {

                // console.log(item_array[k]); 
                if (item_array[k].includes('+') === true) {

                    let char_text = item_array[k].substring(3);
                    let number_item = item_array[k][1]; 
                    let exTop_text = `${number_item}:${char_text}`; 

                    let test_num = item_array[k][1] * total_num;
                    let exTop_text_v2 = `${test_num}:${char_text}`;

                    // console.log(exTop_text); 
                    temp_price_array.push(exTop_text); 
                    makePrice_array.push(exTop_text_v2); 
                }

                temp_array.push(item_array[k]); 
                otherPref_array.push(item_array[k]); 
            }
        }
    }

    // console.log("temp_array is: " + temp_array); 
    // console.log("temp_price_array is: " + temp_price_array);
    // console.log("otherPref_array is: " + otherPref_array);
    // console.log("makePrice_array is: " + makePrice_array); 

    // Trying to insert all added items to Table_Check db 
    // for (let v = 0; v < makePrice_array.length; v++) {

    //     let item_name_v2 = makePrice_array[v].split(':')[1]; 
    //     let item_number_v2 = makePrice_array[v].split(':')[0]; 

    //     // Insert some values into table check db
    //     db.query(`select * from ${table_key}_Check where item_name = (?)`, (item_name_v2), (error, result) => {
    //         if(error) {
    //             console.log(error); 
    //         }

    //         if (result.length > 0) {

    //             let update_num = result[0]['item_num'] + Number(item_number_v2); 
    
    //             // This is the item already exsited in db 
    //             db.query(`UPDATE ${table_key}_Check SET item_num = (?) WHERE id = (?)`, [update_num, result[0]['id']], (error, test) => {
    //                 if(error) {
    //                     console.log(error); 
    //                 }
    //             })
    
    //         } else {
    
    //             // This is the first item to insert 
    //             db.query(`insert into ${table_key}_Check (item_name, item_num) values (?, ?)`, [item_name_v2, item_number_v2], (error, test) => {
    //                 if (error) {
    //                     console.log(error);
    //                 }
    //             })
    //         }
    //     })
    // } 

    let item_total = 0; 

    // Insert a total result into table db 
    for (let g = 0; g < temp_price_array.length; g++) {

        let item_name_v3 = temp_price_array[g].split(':')[1]; 
        let item_number_v3 = temp_price_array[g].split(':')[0]; 

        // Get a total price for the added items and insert into table db
        db.query(`select * from Menu_List where item_name = (?)`, (item_name_v3), (error, result_v3) => {
            if(error) {
                console.log(error); 
            }
    
            // console.log(result_v2[0]['item_name'] + ' is: ' + result_v2[0]['total_price'], item_number_v2); 
            item_total = item_total + ((result_v3[0]['total_price']) * item_number_v3); 
    
            // console.log(item_total); 
    
            if (g === (temp_price_array.length - 1)){
    
                // console.log("This is the end of this for loop"); 
    
                if (total_num > 1) {

                    if (otherPref_array.length > 0) {

                        console.log("This item is with some pref"); 

                        for (let q = 0; q < total_num; q++) {
                            let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price) values(?, ?, ?, ?, ?)`; 
                            db.query(insert_sql, [temp_array.join(':'), temp_array[0], otherPref_array.join(':'), temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                                if(error) {
                                    console.log(error); 
                                }
                            }); 
                        }

                    } else {

                        console.log("This item is not with pref"); 

                        for (let r = 0; r < total_num; r++) {
                            let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price) values(?, ?, ?, ?)`; 
                            db.query(insert_sql, [temp_array.join(':'), temp_array[0], temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                                if(error){
                                    console.log(error); 
                                }
                            }); 
                        }
                    }

                } else {

                    if (otherPref_array.length > 0) {

                        let insert_sql = `insert into ${table_key}(full_order, main_item, other_pref, item_num, item_price) values(?, ?, ?, ?, ?)`; 
                        db.query(insert_sql, [temp_array.join(':'), temp_array[0], otherPref_array.join(':'), temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                            if(error) {
                                console.log(error); 
                            }
                        }); 

                    } else {

                        let insert_sql = `insert into ${table_key}(full_order, main_item, item_num, item_price) values(?, ?, ?, ?)`; 
                        db.query(insert_sql, [temp_array.join(':'), temp_array[0], temp_price_array.join(','), item_total.toFixed(2)], (error) => {
                            if(error){
                                console.log(error); 
                            }
                        }); 
                    }
                }
            }
        })
    }

    // Make sure if this order is togo or phone 
    if (togo_key === 'togo_key' || phone_key === 'phone_key') {

        console.log("Items are added for togo or phone order!");

        // Back to server add page
        return res.redirect(url.format({
            pathname: '/addPage_Togo&Phone',
            query: {
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_key
            }
        }))

    } else {

        console.log("Itmes are added as a regular order");
        
        return res.redirect(url.format({
            pathname: '/addPage',
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