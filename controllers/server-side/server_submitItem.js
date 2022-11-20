const url = require("url");
// const db_conn = require("../../db/db-conn"); 
// const db = db_conn["db_conn"];

// Submit Btn Controller 
exports.submitItem = (req, res) => {

    const {userName, date_key, time_key, table_key, togo_key, phone_key, pickUp_time} = req.body; 

    // console.log("Submititem controller:"); 

    if (togo_key === 'togo_key') {

        console.log("This is a togo order"); 

        // Go back to server main page
        return res.redirect(url.format({
            pathname: '/serverView_Togo&Phone',
            query: {
                "status": "Server_ViewPage",
                "user": userName,
                "date": date_key, 
                "time": time_key, 
                "table": table_key
            }
        }))

    } else {

        console.log('Phone order is submitted!'); 

        // Go back to server main page
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
}
