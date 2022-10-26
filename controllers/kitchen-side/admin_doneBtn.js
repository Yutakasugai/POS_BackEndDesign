const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Start btn functions
exports.doneBtn = (req, res) => {
    
    const {adminName, date_key, time_key, box_id, table_id} = req.body; 

    // console.log(adminName, date_key, time_key, box_id); 
    let new_table_id = table_id.replace('Extra:', ''); 

    if (new_table_id.includes('Phone') === true) {

        db.query(`select * from updated_table where id = (?)`, (box_id), (error, est_val) =>{
            if(error) {
                console.log(error); 
            }

            db.query(`select * from ${new_table_id} where kitchen_id = (?)`, (box_id), (error, result) => {
                if (error) {
                    console.log(error); 
                }
        
                for (let i = 0; i < result.length; i++) {
        
                    let item_name = result[i]['full_order']; 
                    
                    // Insert all item values to order_result db
                    db.query(`insert into order_result(table_name, EST, order_item) values(?, ?, ?)`, [table_id, est_val[0]['EST'], item_name], (error) => {
                        if(error) {
                            console.log(error); 
                        }
                    })
                }

                return; 
            })
        })
    } else {

        db.query(`select * from ${new_table_id} where kitchen_id = (?)`, (box_id), (error, result) => {
            if (error) {
                console.log(error); 
            }
    
            for (let i = 0; i < result.length; i++) {
    
                let item_name = result[i]['full_order']; 
                
                // Insert all item values to order_result db
                db.query(`insert into order_result(table_name, order_item) values(?, ?)`, [table_id, item_name], (error) => {
                    if(error) {
                        console.log(error); 
                    }
                })
            }

            return; 
        })
    }

    // Delete served items from coming_order db
    db.query(`delete from coming_order where kitchen_id = (?)`, (box_id), (error) => {
        if (error) {
            console.log(error); 
        }
    })

    // Delete the order box from updated_table
    db.query(`delete from updated_table where id = (?)`, (box_id), (error) => {
        if (error) {
            console.log(error); 
        }

        // // Check if the num table has extra order or something
        // db.query(`select * from updated_table where table_id = (?)`, (new_table_id), (error, result) => {
        //     if (error) {
        //         console.log(error); 
        //     }

        //     if (result.length > 0) {
                
        //         console.log('There are still orders found on the kitchen side'); 

        //         // Redirect to admin main page
        //         return res.redirect(url.format({
        //             pathname: '/adminMain',
        //             query: {
        //                 admin: adminName, 
        //                 date: date_key,
        //                 time: time_key
        //             }
        //         }))

        //     } else {

        //         // Define if the order is phone or togo 
        //         if (new_table_id.includes('Phone') === true || new_table_id.includes('Togo') === true) {

        //             // Update the finish table value 
        //             db.query(`update togo_phone set readyPay_status = 'True' where table_id = (?)`, (new_table_id), (error) => {
        //                 if (error) {
        //                     console.log(error); 
        //                 }
        //             })
        //         }

        //         console.log('There is no any other orders found on the kitchen side'); 

        //         // Update the finish table value 
        //         db.query(`update table_check`)
        //     }
        // })
    })

    // Redirect to admin main page
    return res.redirect(url.format({
        pathname: '/adminMain',
        query: {
            admin: adminName, 
            date: date_key,
            time: time_key
        }
    }))
}