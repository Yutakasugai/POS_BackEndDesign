const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.removeItem_edit = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, remove_key_edit, togo_key, phone_key} = req.body; 

    // console.log("This is remove ket edit: " + remove_key_edit); 

    const removeItem_array = []; 
    
    let remove_item = remove_key_edit.split(':'); 
    let removeItem_id = remove_item[0]; 
    let removeID_kitchen = remove_item[1]; 
    let removeItem_name = '1:' + remove_item[2]
    .replace('[R]', '').replace('[L]', '')
    .replace('/[S]', '').replace('/[B]', ''); 

    removeItem_array.push(removeItem_name); 

    if (remove_item[3] === '') {

        console.log("This item is not with ex top or pref"); 

    } else {

        for (let i = 3; i < remove_item.length; i++) {

            if (remove_item[i].includes('+') === true) {

                let exTop_text = remove_item[i].substring(3); 
                let exTop_number = remove_item[i][1]; 
                let exTop_result = `${exTop_number}:${exTop_text}`; 

                removeItem_array.push(exTop_result); 
            }
        }
    }

    // console.log(removeItem_array); 
    // console.log(removeItem_id, removeID_kitchen); 

    // Remove the selected item from table check db
    for (let j = 0; j < removeItem_array.length; j++) {

        let item_number = Number(removeItem_array[j].split(':')[0]); 
        let item_name = removeItem_array[j].split(':')[1]; 

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

    // Make a change in updated_table db
    db.query(`select * from updated_table where id = (?)`, (removeID_kitchen), (error, result) => {
        if (error) {
            console.log(error); 
        }

        let new_itemID_array = result[0]['item_id'].split(':'); 
        let remove_id = removeItem_id;  
        new_itemID_array = new_itemID_array.filter(item => item !== remove_id);

        if (new_itemID_array.length > 0) {

            db.query(`update updated_table set item_id = (?) where id = (?)`, [new_itemID_array.join(':'), removeID_kitchen], (error) => {
                if(error) {
                    console.log(error); 
                }
            })

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
                }) 
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

        } else {

            console.log("This box bacame empty now..."); 

            // Delete the table row from updated_table
            db.query(`delete from updated_table where id = (?)`, (removeID_kitchen), (error) => {
                if (error) {
                    console.log(error); 
                }
            })

            // Remove all tables related to this table 
            db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                if (error) {
                console.log(error); 
                }
            })

            // Delete all table rows from coming_order db
            db.query(`delete from coming_order where kitchen_id = (?)`, (removeID_kitchen), (error) => {
                if (error){
                console.log(error); 
                }
            })

            if (togo_key === 'togo_key' || phone_key === 'phone_key') {

                // Update table_check db 
                db.query(`delete from togo_phone where table_id = (?)`, (table_key), (error) => {
                    if (error) {
                    console.log(error); 
                    }

                    // Back to serverHome page
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

            } else {
                // Update table_check db 
                db.query(`update table_check set table_status = (?), num_customer = (?) where table_id = (?)`, ['empty', 'None', table_key], (error) => {
                    if (error) {
                    console.log(error); 
                    }

                    // Back to serverHome page
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
    })
}