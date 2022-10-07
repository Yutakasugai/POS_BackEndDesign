const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// View Page Controller
exports.viewBack = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, togo_key, phone_key} = req.body; 

    // Capture the submit and unsubmit items from the certain table
    db.query(`select * from ${table_key} where order_status = 'submit'`, (error, result) => {
        if(error){
            console.log(error); 
        }

        db.query(`select * from ${table_key} where order_status = 'unsubmit'`, (error, unsubmit_items) => {
            if(error){
                console.log(error); 
            }

            if (togo_key === 'togo_key') {

                return res.render("addPage", {
                    name: userName, 
                    Date: date_key, 
                    Time: time_key,
                    table_key: table_key, 
                    c_number: c_number,
                    togo_key: 'togo_key',
                    submit_items: result,
                    items: unsubmit_items
                }); 

            } else if (phone_key === 'phone_key') {

                return res.render("addPage", {
                    name: userName, 
                    Date: date_key, 
                    Time: time_key,
                    table_key: table_key, 
                    c_number: c_number,
                    phone_key: 'phone_key',
                    submit_items: result,
                    items: unsubmit_items
                }); 

            } else {

                return res.render("addPage", {
                    name: userName, 
                    Date: date_key, 
                    Time: time_key,
                    table_key: table_key, 
                    c_number: c_number,
                    submit_items: result,
                    items: unsubmit_items
                }); 
            }
        })
    })
}