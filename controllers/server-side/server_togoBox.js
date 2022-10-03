const { table } = require("console");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.togoBox = (req, res) => {

    const {userName, date_key, time_key, table_key, func_key} = req.body; 

    // console.log(table_key, func_key); 

    if (func_key === 'done_id') {

        // Update the total result in the menu list db
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

        console.log("This is update button from togo box"); 

        // Capture submitted items from db
        db.query(`select * from ${table_key} where order_status = "submit"`, (error, submit_items) => {
            if(error) {
                console.log(error); 
            }

            return res.render('addPage', {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                c_number: 1,
                togo_key: 'togo_key',
                submit_items: submit_items
            })
        })
    }
}