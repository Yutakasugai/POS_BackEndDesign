const db_conn = require("../../../db/db-conn"); 
const db = db_conn["db_conn"];

// If user update for table 1, this exports will take user to update-1 page
exports.addPage_2 = (req, res) => {

    const {table_key, userName} = req.body; 

    db.query('SELECT * FROM menu_list', (error, results) => {
        if(error){
            console.log(error)
        } 

        db.query('SELECT * FROM table_2', (error, orders) => {
            if(error){
                console.log(error)
            }

            //console.log(orders); 

            if(orders.length > 0){

                res.render('home', {
                    name: userName, 
                    table_key: table_key,
                    items: results, 
                    check_items: orders
                })
            } else {

                //console.log("No items added yet...")

                res.render('home', {
                    name: userName, 
                    table_key: table_key,
                    items: results, 
                    check_msg: "No items found..."
                })
            }
        })
    })
}