const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Sign Out Admin 
exports.signOut = (req, res) => {

    const {adminName, date_key, time_key} = req.body; 
    console.log("Admin SignOut", adminName, date_key, time_key);

    // Update admin status in db
    db.query(`update admin set admin_status = 'False' where admin_name = (?)`, (adminName), (error) => {
        if (error) {
            console.log(error); 
        }

        // Drop some tables 
        db.query(`drop table if exists order_result, updated_table`, (error) => {
            if (error) {
                console.log(error); 
            }

            // Back to page with error msg
            return res.redirect(url.format({
                pathname: '/signout',
                query: {
                    "user": adminName,
                    "status": "Sign Out"
                }
            })) 
        })
    })
}
