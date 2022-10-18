const db_conn = require("../db/db-conn"); 
const db = db_conn["db_conn"];

// View Data Function
exports.viewData = (req, res) => {

    const {adminName, data_key, time_key} = req.body; 

    console.log("User trying to enter viewData page!"); 

    db.query('select * from viewData', (error, result) => {
        if (error) {
            console.log(error)
        }

        console.log(result); 

        res.render("admin_record", {
            name: adminName,
            data: data_key,
            time: time_key,
            display_data: result
        })
    })
}