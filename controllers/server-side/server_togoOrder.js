const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.togoOrder = (req, res) => {

    const {userName, date_key, time_key, table_key} = req.body; 

    // Check if there is any other togo order 
    db.query(`select * from togo_phone where order_status = (?)`, (table_key), (error, result) => {
        if(error){
            console.log(error); 
        }

        let table_name = '';

        if (result.length > 0) {

            // console.log(result[get_key]['table_id']);
            let find_lastChar = result[result.length - 1]['table_id'].slice(-1);
            let number_id = Number(find_lastChar) + 1; 
            table_name = `${table_key}_${number_id}`;

            // Insert Values into togo_phone db
            db.query(`insert into togo_phone(order_status, table_id, num_customer) values(?, ?, ?)`, [table_key, table_name, '1'], (error) => {
                if (error) {
                    console.log(error); 
                }
            })

        } else {

            table_name = `${table_key}_1`; 

            // Insert Values into togo_phone db
            db.query(`insert into togo_phone(order_status, table_id, num_customer) values(?, ?, ?)`, [table_key, table_name, '1'], (error) => {
                if (error) {
                    console.log(error); 
                }
            })
        }

        // Create a new table in db for the table num 
        db.query(`CREATE TABLE IF NOT EXISTS ${table_name} (id INT AUTO_INCREMENT PRIMARY KEY, full_order TEXT NOT NULL, main_item TEXT NOT NULL, other_pref TEXT, item_num TEXT NOT NULL, item_price TEXT NOT NULL, kitchen_id TEXT, order_status TEXT DEFAULT "unsubmit")`); 
            
        // Create another table to keep each item 
        db.query(`CREATE TABLE IF NOT EXISTS ${table_name}_Check (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_num INT NOT NULL)`); 
    
        // Back to server add page
        return res.redirect(url.format({
            pathname: '/addPage_Togo&Phone',
            query: {
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_name
            }
        }))
    })
}
