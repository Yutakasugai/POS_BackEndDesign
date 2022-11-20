const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.removeItem_edit = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, remove_key_edit, togo_key, phone_key} = req.body;

    // let kitchen_id = remove_key_edit.split(':')[1];  

    // !! Important
    // show table query using the database name to find a prticular table from db 
    // If database gets a problem, you gotta change the name to the new database name
    
    db.query(`SHOW TABLES WHERE tables_in_node_posDB LIKE '${table_key}'`, (error, table_result) => {
        if (error) {
            console.log(error); 
        } 

        if (table_result.length > 0) {
            // Items still exist on this table 
            if (togo_key === 'togo_key' || phone_key === 'phone_key') {

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
        } else {
            
            // This table is no longer existing 
            // Back to serverHome page
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