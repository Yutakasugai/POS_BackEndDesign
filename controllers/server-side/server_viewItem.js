const url = require("url");
// const db_conn = require("../../db/db-conn"); 
// const db = db_conn["db_conn"];

// View Page Controller
exports.viewPage = (req, res) => {

    const {userName, date_key,time_key, table_key, c_number, phone_key} = req.body; 

    if (phone_key === 'phone_key') {

        // Phone Orders
        return res.redirect(url.format({
            pathname: '/serverView_Togo&Phone',
            query: {
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_key,
            }
        }))

    } else {

        // Regular Orders From T1 to T8

        // Go to Page and Render serverView page
        return res.redirect(url.format({
            pathname: '/serverView',
            query: {
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_key,
                "c_num": c_number
            }
        }))
    }
}