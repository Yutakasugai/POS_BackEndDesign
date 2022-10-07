const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.phoneBox = (req, res) => {

    const {userName, date_key, time_key, table_key, func_key} = req.body; 

    // console.log(userName, date_key, time_key, table_key, func_key); 

    // Capture the submit value from db
    db.query(`select * from ${table_key} where order_status = 'submit'`, (error, submit_items) => {
        if (error) {
            console.log(error); 
        }

        // Capture the EST from db
        db.query(`select * from togo_phone where table_id = (?)`, (table_key), (error, result) => {
            if(error) {
                console.log(error); 
            }

            if (func_key === 'update_id') {

                return res.render('addPage', {
                    name: userName, 
                    Date: date_key, 
                    Time: time_key,
                    table_key: table_key, 
                    pickUp_time: result[0]['EST'],
                    noView_id: 'True',
                    phone_key: 'phone_key',
                    submit_items: submit_items
                })
    
            } else {
    
                return res.render('serverView', {
                    name: userName, 
                    Date: date_key, 
                    Time: time_key,
                    table_key: table_key, 
                    pickUp_time: result[0]['EST'],
                    phone_key: 'phone_key',
                    ifPhone_id: 'True',
                    submit_items: submit_items
                })
            }
        })
    })
}

