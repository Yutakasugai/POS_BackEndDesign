const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.removeItem = (req, res) => {

    const {userName, date_key, time_key, table_key, c_number, remove_key, togo_key, phone_key} = req.body; 

    const itemID_array = []; 

    let test = remove_key.split(','); 

    for (let j = 0; j < test.length; j++) {
        itemID_array.push(test[j].split(':')[0]); 
    }

    // Delete the item row from table database 
    for (let q = 0; q < itemID_array.length; q++) {

        db.query(`delete from ${table_key} where id = (?)`, (itemID_array[q]), (error) => {
            if (error) {
                console.log(error); 
            }
        })
    }

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

        // Return to Add Page 
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
        })); 
    }
}

