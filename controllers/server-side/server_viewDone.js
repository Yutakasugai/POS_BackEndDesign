const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// View Done Button Controller
exports.viewDone = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, togo_key, phone_key} = req.body; 

    if (togo_key === 'togo_key' || phone_key === 'phone_key') {

        // Togo Order & Phone Order
        db.query(`update ${table_key} set order_status = 'paid'`, (error) => {
            if (error) {
                console.log(error); 
            }

            // Go back to serverHome page
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
        // Regular Orders From T1 - T8 

        db.query(`update table_check set pending_table = 'False' where table_id = (?)`, (table_key), (error) => {
            if (error) {
                console.log(error); 
            }
        })

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

            // Insert submit items to done_order db
            db.query(`select * from ${table_key} where order_status = 'submit'`, (error, submit_item) => {
                if (error) {
                    console.log(error); 
                }

                for (let i = 0; i < submit_item.length; i++) {
                    db.query(`insert into done_order(table_id, item_name) values(?, ?)`, [table_key, submit_item[i]['full_order']], (error) => {
                        if (error) {
                            console.log(error); 
                        }
                    })
                }
            })

            // Update customer_result db
            db.query(`insert into customer_result(table_id, num_customer) values(?, ?)`, [table_key, c_number], (error) => {
                if (error) {
                    console.log(error); 
                }
            })

            // Remove all data related to this table db 
            db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                if(error) {
                    console.log(error); 
                }
            })

            // Reset table set on table_check db
            db.query(`update table_check set table_status = (?), num_customer = (?) where table_id = (?)`, ['empty', 'None', table_key], (error) => {
                if (error) {
                    console.log(error); 
                }
            })
        
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
