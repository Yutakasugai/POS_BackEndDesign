const { error } = require("console");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Green Button to close the whole system and leave 
exports.closeAll = (req, res) => {

    const {userName, date_key, time_key, tip_val, sale_val, cash_val} = req.body;

    console.log('You just pressed the check button to close teh whole system...'); 

    if (tip_val !== 'None' && sale_val !== 'None' && cash_val !== 'None') {
        console.log('Passed a first condition if they are not all None'); 
        
        if (Number(tip_val) > 0 && Number(cash_val) > 0) {
            console.log('Passed a second condition if they are more than 1'); 

            // Update number of items sold on the day 
            db.query(`select * from Menu_List where num_item != '0'`, (error, item_result) => {
                if (error) {
                    console.log(error); 
                }

                const item_arr = []; 
                for (let i = 0; i < item_result.length; i++) {
                    // console.log(`${item_result[i]['item_name']}:${item_result[i]['num_item']}`); 
                    let item = `${item_result[i]['item_name']}:${item_result[i]['num_item']}`; 
                    item_arr.push(item); 
                } 

                // Insert values 
                db.query(`update final_result set item_list = (?) where date_key = (?) and time_key = (?)`, [item_arr.join(','), date_key, time_key], (error) => {
                    if (error) {
                        console.log(error); 
                    }

                    // Reset menu list 
                    db.query(`update Menu_List set num_item = '0'`, (error) => {
                        if (error) {
                            console.log(error); 
                        }

                        // Reset tbale_check just in case 
                        db.query(`update table_check set table_status = 'empty', pending_table = 'False', num_customer = 'None'`, (error) => {
                            if (error) {
                                console.log(error); 
                            }

                            // Change all users status to False from True -> Disable anyone access to this system
                            db.query(`UPDATE users SET user_status = 'False'`, (error) => {
                                if(error) {
                                    console.log(error); 
                                }

                                // Drop and Clean tables 
                                db.query(`drop table if exists coming_order, customer_result, done_order, togo_phone`, (error) => {
                                    if (error) {
                                        console.log(error); 
                                    }

                                    // Back to Homa Page
                                    return res.redirect(url.format({
                                        pathname: '/signout',
                                        query: {
                                            "status": "Close All",
                                            "user": userName
                                        }
                                    }))
                                })
                            })
                        })
                    })
                })
            })

        } else {
            console.log('Not passed for the second condition...'); 

            // Back to serverClose page
            return res.redirect(url.format({
                pathname: '/serverClose',
                query: {
                    "user": userName,
                    "date": date_key, 
                    "time": time_key
                }
            }))
        }

    } else {
        console.log('Not passed for the first condition...'); 

        // Back to serverClose page
        return res.redirect(url.format({
            pathname: '/serverClose',
            query: {
                "user": userName,
                "date": date_key, 
                "time": time_key
            }
        }))
    }
}