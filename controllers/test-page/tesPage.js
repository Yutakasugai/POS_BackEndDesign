const { PassThrough } = require("stream");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.addTest = (req, res) => {

    const {table_id} = req.body; 
    console.log("This is a test page: " + table_id); 

    const test_array = ['Shio(R)/(S)', 'C.plate(S)', 'Gyoza', 'Shoyu(L)/(S):+2(Egg:[No Beans]:[No Corn]:[No G.Onion]']; 
    const test_array_2 = ['Ice Cream', 'Gyoza']; 

    const test_line = test_array.join(','); 
    const test_line_2 = test_array_2.join(',');
    //console.log(test_line)

    // Major table sql functions
    insert_sql = `insert into ${table_id}(item_name, item_price) values('Shio(R)/(S)', '12.45')`; 
    extraItem_sql = `insert into ${table_id}(item_name, item_price, item_status) values('Gyoza', '5.00', 'True')`; 
    check_sql = `select * from ${table_id}`; 
    create_sql = `CREATE TABLE IF NOT EXISTS ${table_id}
    (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_price TEXT NOT NULL, item_status TEXT)`; 

    // Updated table sql functions 
    create_sql_2 = `CREATE TABLE IF NOT EXISTS updated_table 
    (id INT AUTO_INCREMENT PRIMARY KEY, order_from TEXT NOT NULL, c_number INTEGER, order_status TEXT, created_at TEXT NOT NULL, order_items TEXT NOT NULL)`; 
    insert_sql_2 = `insert into updated_table(order_from, c_number, created_at, order_items) values(?, ?, ?, ?)`; 
    extraItem_sql_2 = `insert into updated_table(order_from, order_status, created_at, order_items) values(?, ?, ?, ?)`; 

    // Check a current time for hours and minutes
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    // Create a table if not exist
    db.query(create_sql, (error) => {
        if(error) {
            console.log(error)
        }
    })

    // Create another table to track a number of tables 
    db.query(create_sql_2, (error) => {
        if(error){
            console.log(error)
        }
    })

    // Check the table condition 
    db.query(check_sql, (error, table_result) => {
        if (error) {
            console.log(error)
        }

        // First order
        if (table_result.length === 0) {

            console.log(`This is not extra order for ${table_id}`); 
            db.query(insert_sql, (error) => {
                if(error){
                    console.log(error)
                }

                db.query(insert_sql_2, [table_id, '5', current, test_line], (error) => {
                    if (error){
                        console.log(error)
                    }

                    return res.redirect('/testPage'); 
                })
            })

        // Extra order
        } else {
            
            console.log(`This is added as extra order to ${table_id}`); 
            db.query(extraItem_sql, (error) => {
                if(error){
                    console.log(error)
                }

                db.query(extraItem_sql_2, [table_id, 'True', current, test_line_2], (error) => {
                    if (error){
                        console.log(error)
                    }

                    return res.redirect('/testPage'); 
                })
            })
        }
    })
}

// All Clear Btn 
exports.clearTest = (req, res) => {

    console.log("All existing table will be dropped");  

    db.query('drop table if exists Table_1, Table_2, Table_3, Table_4, Table_5, Table_6, Table_7, Table_8, updated_table', (error) => {
        if (error){
            console.log(error)
        }

        console.log("Existed tables are all gone!"); 

        return res.redirect('/testPage'); 
    })
}

// Switch Btn Test
exports.switchTest = (req, res) => {

    const {switch_id, table_num} = req.body; 

    // All needed functions
    check_sql = `select * from ${table_num}`;
    switch_sql = `insert into ${switch_id}(item_name, item_price, item_status) values(?, ?, ?)`; 
    drop_sql = `drop table ${table_num}`; 
    create_sql = `CREATE TABLE IF NOT EXISTS ${switch_id}
    (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_price TEXT NOT NULL, item_status TEXT)`; 

    // Updated table sql functions 
    create_sql_2 = `CREATE TABLE IF NOT EXISTS updated_table 
    (order_from TEXT NOT NULL, c_number INTEGER, order_status TEXT, created_at TEXT NOT NULL, order_items TEXT NOT NULL)`; 
    //update_sql = `UPDATE updated_table SET order_from = '${switch_id}' WHERE order_from = '${table_num}';`
    update_sql = `UPDATE updated_table SET order_from = (?) WHERE order_from = (?) ;`

    // Check if the table exist or not 
    db.query(`show tables`, (error, table_result) => {
        if(error){
            console.log(error)
        } 

        if (exist_table(table_result, table_num) === true){

            db.query(create_sql, (error) => {
                if (error) {
                    console.log(error)
                }

                // Create updated table if not exist
                db.query(create_sql_2, (error) => {
                    if(error){
                        console.log(error)
                    }
                })
        
                // Switch the table condition
                db.query(check_sql, (error, cur_table) => {
                    if(error) {
                        console.log(error)
                    }
        
                    console.log("This table has items!"); 
                    //console.log(cur_table[0]['item_name'], cur_table[0]['item_price'], cur_table[0]['item_status']); 
        
                    for (let s = 0; s < cur_table.length; s++) {
                        
                        db.query(switch_sql, [cur_table[s]['item_name'], cur_table[s]['item_price'], cur_table[s]['item_status']], (error) => {
                            if(error){
                                console.log(error)
                            }
                        })
                    }

                    // Update table number in db 
                    db.query(update_sql, [switch_id, table_num], (error) => {
                        if (error) {
                            console.log(error); 
                        }
                        console.log(`Db updated from ${table_num} to ${switch_id}`); 

                        // Check if there is a changed name table 
                        const name_changed = `Extra: ${table_num}`; 

                        db.query(update_sql, [name_changed, table_num], (error) => {
                            if (error) {
                                console.log(error); 
                            }
                            console.log(`An extra order recept also change the table number`); 
                        })
                    })

                    // Clear the original table
                    db.query(drop_sql, (error) => {
                        if(error){
                            console.log(error)
                        }
                        console.log(`${table_num} was dropped from db`); 
                    })
        
                    console.log(`Every items was succesfully switched from ${table_num} to ${switch_id}`); 
                    return res.redirect('/testPage'); 
                })
            })
        } else {

            console.log(`${table_num} table does not exist in db!`); 
            return res.redirect('/testPage');  
        }
    })
}

function exist_table(table_result, table_num) {

    for (let t = 0; t < table_result.length; t++){

        if (table_result[t]['Tables_in_pos_database'] === table_num) {

            console.log("This table exist in db!"); 
            return true; 
        } 
    }  

    return false; 
}

