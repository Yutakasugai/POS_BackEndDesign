const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.editItem = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, edit_item, edit_total_num, edit_key, togo_key, phone_key} = req.body; 

    // console.log(edit_item, edit_total_num, edit_key); 
    
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
}

