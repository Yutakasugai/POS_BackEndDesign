const { table } = require("console");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.togoBox = (req, res) => {

    const {userName, date_key, time_key, table_key, func_key} = req.body; 

    // console.log(table_key, func_key); 

    if (func_key === 'update_id') {

        // Go to Page and Render addPage
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

        db.query(`select * from ${table_key} where order_status = 'submit'`, (error, result) => {
            if (error) {
                console.log(error); 
            }

            // if you go to this condition, suspect some serious problem with this coding 
            if (result.length > 0) {

                console.log('Some items still not paid yet...'); 

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

            } else {

                // console.log('All items are paid, so ready to done'); 

                // Update the total result in the menu list db
                db.query(`select * from ${table_key}_Check`, (error, table_result) => {
                    if(error) {
                        console.log(error); 
                    }

                    for (let i = 0; i < table_result.length; i++) {
                        let item_name = table_result[i]['item_name']; 
                        let item_num = Number(table_result[i]['item_num']); 

                        db.query(`select * from Menu_List where item_name = (?)`, (item_name), (error, menuList_result) => {
                            if (error) {
                                console.log(error); 
                            }

                            let update_num = Number(menuList_result[0]['num_item']) + item_num;
                            db.query(`update Menu_List set num_item = (?) where item_name = (?)`, [update_num, item_name], (error) => {
                                if(error) {
                                    console.log(error); 
                                }
                            })
                        })
                    }
                })

                // Insert items to done_order db
                db.query(`select * from ${table_key} where order_status = 'paid'`, (error, paid_items) => {
                    if (error) {
                        console.log(error); 
                    } 

                    for (let i = 0; i < paid_items.length; i++) {
                        db.query(`insert into done_order(table_id, item_name) values(?, ?)`, [table_key, paid_items[i]['full_order']], (error) => {
                            if (error) {
                                console.log(error); 
                            }
                        })
                    }
                })

                // Remove all data related to this table db 
                db.query(`drop table if exists ${table_key}, ${table_key}_Check`, (error) => {
                    if(error) {
                        console.log(error); 
                    }
                })

                // Remove the table id from togo_phone db
                db.query(`delete from togo_phone where table_id = (?)`, (table_key), (error) => {
                    if (error) {
                        console.log(error); 
                    }
                })

                // Remove the item from coming_order db as well
                db.query(`DELETE FROM coming_order WHERE table_id = (?)`, (table_key), (error) => {
                    if (error) {
                        console.log(error); 
                    }
                }) 

                // Update customer_result db
                db.query(`insert into customer_result(table_id, num_customer) values(?, ?)`, [table_key, '1'], (error) => {
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
            }
        })
    }
}