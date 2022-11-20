const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Server Close Page 
exports.finishBtn = (req, res) => {

    const {userName, date_key, time_key} = req.body; 

    // Check table check 
    db.query(`select * from table_check where table_status = 'filled'`, (error, table_check) => {
        if (error) {
            console.log(error); 
        } 

        // Check togo phone 
        db.query(`select * from togo_phone`, (error, togo_phone) => {
            if (error) {
                console.log(error); 
            }

            // Check update_table 
            db.query(`select * from updated_table`, (error, updated_table) => {
                if (error) {
                    console.log(error); 
                }

                if (table_check.length === 0 && togo_phone.length === 0 && updated_table.length === 0) {
                    console.log('You are good to close this whole system'); 

                    // Check if the user already comes into this process 
                    db.query(`select * from final_result where date_key = (?) and time_key = (?)`, [date_key, time_key], (error, result_v1) => {
                        if (error) {
                            console.log(error); 
                        }

                        if (result_v1.length > 0) {
                            // console.log('This user was already in this process to close the system...'); 

                            db.query(`select * from customer_result`, (error, result_v2) => {
                                if (error) {
                                    console.log(error); 
                                } 

                                // Get a total number of customer 
                                let total = 0; 
                                for (let i = 0; i < result_v2.length; i++) {
                                    total = total + Number(result_v2[i]['num_customer']); 
                                }

                                // Make a total sale 
                                db.query(`select * from Menu_List`, (error, item_result) => {
                                    if (error) {
                                        console.log(error); 
                                    } 

                                    let total_sale = 0; 
                                    for (let i = 0; i < item_result.length; i++) {
                                        if (item_result[i]['num_item'] > 0) {
                                            // console.log(item_result[i]['item_name'], item_result[i]['num_item']); 
                                            let total_each = item_result[i]['total_price'] * item_result[i]['num_item']; 
                                            // console.log(item_result[i]['item_name'], item_result[i]['num_item'], total_each.toFixed(2)); 
                                            total_sale = total_sale + Number(total_each.toFixed(2)); 
                                        }
                                    }

                                    if ( Number(result_v1[0]['customer_total']) === total && Number(result_v1[0]['sale_total']) === total_sale.toFixed(2)) {
                                        console.log('Same total customer and sale as a previous visit...') 

                                        // Go server_close page
                                        return res.redirect(url.format({
                                            pathname: '/serverClose',
                                            query: {
                                                "user": userName,
                                                "date": date_key, 
                                                "time": time_key, 
                                            }
                                        }))

                                    } else {
                                        console.log('The value was changed from the previous visit...'); 

                                        // Update final result
                                        db.query(`update final_result set sale_total = (?), customer_total = (?) where id = (?)`, [total_sale.toFixed(2), total, result_v1[0]['id']], (error) => {
                                            if (error) {
                                                console.log(error); 
                                            }

                                            // Go server_close page
                                            return res.redirect(url.format({
                                                pathname: '/serverClose',
                                                query: {
                                                    "user": userName,
                                                    "date": date_key, 
                                                    "time": time_key, 
                                                }
                                            }))
                                        })
                                    }
                                })
                            })
                            
                        } else {

                            // Capture the total customer number 
                            db.query(`select * from customer_result`, (error, result_v2) => {
                                if (error) {
                                    console.log(error); 
                                } 

                                // Get a total number of customer 
                                let total = 0; 
                                for (let i = 0; i < result_v2.length; i++) {
                                    total = total + Number(result_v2[i]['num_customer']); 
                                }

                                // Make a total sale 
                                db.query(`select * from Menu_List`, (error, item_result) => {
                                    if (error) {
                                        console.log(error); 
                                    } 

                                    let total_sale = 0; 
                                    for (let i = 0; i < item_result.length; i++) {
                                        if (item_result[i]['num_item'] > 0) {
                                            // console.log(item_result[i]['item_name'], item_result[i]['num_item']); 
                                            let total_each = item_result[i]['total_price'] * item_result[i]['num_item']; 
                                            // console.log(item_result[i]['item_name'], item_result[i]['num_item'], total_each.toFixed(2)); 
                                            total_sale = total_sale + Number(total_each.toFixed(2)); 
                                        }
                                    }

                                    // Create a new row of table 
                                    db.query(`insert into final_result (date_key, time_key, sale_total, customer_total) values (?, ?, ?, ?)`, [date_key, time_key, total_sale.toFixed(2), total], (error) => {
                                        if (error) {
                                            console.log(error); 
                                        }

                                        // Go server_close page
                                        return res.redirect(url.format({
                                            pathname: '/serverClose',
                                            query: {
                                                "user": userName,
                                                "date": date_key, 
                                                "time": time_key, 
                                            }
                                        }))
                                    })
                                })
                            })
                        }
                    })

                } else {
                    console.log('There are still active orders existing...'); 

                    // Back to serverHome Page
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
        })
    })
}