const url = require("url");
const db_conn = require("../../db/db-conn");
const db = db_conn["db_conn"];

// close btn function 
exports.closeBtn = (req, res) => {

    const {adminName, data_key, time_key} = req.body;

    //console.log(data_key); 
    drop_sql = 'drop table if exists Table_1, Table_2, Table_3, Table_4, Table_5, Table_6, Table_7, Table_8, updated_table, order_result'; 
    
    // create_sql = `CREATE TABLE IF NOT EXISTS total_result
    // (id INT AUTO_INCREMENT PRIMARY KEY, order_from TEXT NOT NULL, c_number INTEGER, order_status TEXT, created_at TEXT NOT NULL, order_items TEXT NOT NULL)`; 

    db.query(drop_sql, (error) => {
        if(error){
            console.log(error)
        }

        console.log("table was removed!"); 

        res.redirect(url.format({
            pathname: "/auth/admin/home",
                query: {
                page: "admin's home page",
                admin: adminName,
                data: data_key, 
                time: time_key
                },
            })
        );
    })
}