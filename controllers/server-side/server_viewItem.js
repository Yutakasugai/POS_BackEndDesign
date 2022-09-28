const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// View Page Controller
exports.viewPage = (req, res) => {

    // console.log("This will take a user to View Page!"); 

    const {userName, date_key,time_key, table_key, c_number, view_id} = req.body; 

    db.query(`select * from ${table_key} where order_status = 'submit'`, (error, result) => {
        if(error){
            console.log(error); 
        }

        if (view_id === 'View') {

            console.log('This is a View button from add page'); 

            // console.log(result); 
            return res.render("serverView", {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                c_number: c_number,
                submit_items: result
            }); 

        } else {

            console.log('This is a Back button on server view page'); 

            // console.log(result); 
            return res.render("addPage", {
                name: userName, 
                Date: date_key, 
                Time: time_key,
                table_key: table_key, 
                c_number: c_number,
                submit_items: result
            }); 
        }
    })
}