const db_conn = require("../../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.viewItem_2 = (req, res) => {

    const {table_key, userName} = req.body;

    db.query('SELECT * FROM table_2', (error, table_results) => {
        if(error){
            console.log(error)
        } 

        noItem_msg = "No items found on this order list..."

        if(table_results.length === 0){
            res.render('edit', {
                name: userName, 
                table_key: table_key,
                items: table_results,
                noItem_msg: noItem_msg
            })
        } else{
            res.render('edit', {
                name: userName, 
                table_key: table_key,
                items: table_results
            })
        }
    })
}