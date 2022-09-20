const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Submit Btn Controller 
exports.submitItem = (req, res) => {

    const {userName, date_key, time_key, table_key} = req.body; 
    // console.log(userName, date_key, time_key, table_key, c_number); 

    const item_array = []; 

    // Capture unsubmitted values from table 
    db.query(`select * from ${table_key} where order_status = "unsubmit"`, (error, result) => {
        if (error) {
            console.log(error); 
        }

        for (let i = 0; i < result.length; i++) {
            // console.log(result[i]['full_order'])
            item_array.push(result[i]['full_order']); 
        }  

        //console.log(item_array); 
        let item_package = item_array.join(','); 

        // Insert values to updated_table
        db.query(`insert into updated_table(table_id, order_items) values(?, ?)`, [table_key, item_package], (error) => {
            if(error) {
                console.log(error); 
            }

            console.log("Items are sent to the kitchen side!"); 
        })

        // Change the order status
        db.query(`update ${table_key} set order_status = "submit"`, (error) => {
            if(error) {
                console.log(error);
            }

            console.log("The order status changed to submit from unsubmit"); 
        })

        // Change the table status 
        db.query(`update table_check set table_status = "filled" where table_id = (?)`, (table_key), (error) => {
            if(error) {
                console.log(error); 
            }

            console.log("The table status changed to filled from empty"); 
        })

        // Go back to server main page
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