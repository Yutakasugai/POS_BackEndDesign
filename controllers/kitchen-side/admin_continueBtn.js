const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Admin Side: Continue Modal for Night or Not 
exports.continueBtn = (req, res) => {

    const {adminName, date_key, time_key, key} = req.body;

    // console.log('This is a continueBtn controller: ', adminName, date_key, time_key, key)

    if (key === 'True') {
        // console.log('User want to continue for night'); 

        // Drop Tables 
        db.query(`drop table if exists order_result, updated_table`, (error) => {
            if (error) {
                console.log(error); 
            }

            // Recreate above tables for Night
            db.query(`CREATE TABLE IF NOT EXISTS updated_table (id INT AUTO_INCREMENT PRIMARY KEY, table_name varchar(255) NOT NULL, table_id varchar(255) NOT NULL, EST varchar(255) DEFAULT "None", item_id varchar(255) NOT NULL)`); 
            db.query(`CREATE TABLE IF NOT EXISTS order_result (id INT AUTO_INCREMENT PRIMARY KEY, table_name varchar(255) NOT NULL, EST varchar(255) DEFAULT "None", order_item varchar(255) NOT NULL)`); 

            // Back to adminMain page 
            return res.redirect(url.format({
                pathname: '/adminMain',
                query: {
                    "admin": adminName,
                    "date": date_key, 
                    "time": 'Night'
                }
            })) 
        })

    } else {
        // console.log('User dont want to continue, just close the system...'); 

        db.query(`update admin set admin_status = 'False'`, (error) => {
            if (error) {
                console.log(error); 
            }

            // Drop table to refresh datas 
            db.query(`drop table if exists order_result, updated_table`, (error) => {
                if (error) {
                    console.log(error); 
                }

                // Back to page with error msg
                return res.redirect(url.format({
                    pathname: '/signout',
                    query: {
                        "user": adminName,
                        "status": 'Work Done'
                    }
                })) 
            })
        })
    }
}