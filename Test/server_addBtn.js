const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Add function - by clicking add button, this function will enable to insert items into table-1 database
exports.addBtn = (req, res) => {

    const {select_item, table_key, userName, date_key, time_key} = req.body; 

    var temp_list = select_item;

    insert_sql = `INSERT INTO ${table_key}(item_name, item_price) VALUES (?, ?)`
    select_sql = `SELECT * FROM ${table_key}`

    if(typeof(temp_list) === 'string'){
        let test_val = Object(temp_list).split(",")

        // console.log(test_val[0], test_val[1])

        db.query(insert_sql, [test_val[0], test_val[1]], (error, results) => {
            if(error){
                console.log(error)
            }
            //console.log("Added sucessfully")
        })

        return res.redirect(url.format({
            pathname: '/auth/user/addPage',
            query: {
                "page": "added items on the data",
                "user": userName,
                "table_id": table_key,
                "date": date_key, 
                "time": time_key
            }
        }))
        
    } else if (typeof(temp_list) === 'object'){
        
        for (let x = 0; x < (temp_list.length); x++){

            let item_list = temp_list[x].split(",");
        
            db.query(insert_sql, [item_list[0], item_list[1]], (error, results) => {
                if(error){
                    console.log(error)
                }
                //console.log("Added sucessfully")
            })
        }

        return res.redirect(url.format({
            pathname: '/auth/user/addPage',
            query: {
                "page": "added items on the data",
                "user": userName,
                "table_id": table_key,
                "date": date_key, 
                "time": time_key
            }
        }))

    } else {

        db.query('SELECT * FROM menu_list', (error, menu_results) => {
            if(error){
                console.log(error)
            } 

            errorMsg = "No items selected"

            db.query(select_sql, (error, table_results) => {
                if(error){
                    console.log(error)
                }

                if(table_results.length === 0){

                    check_msg = "No items added yet..."

                    return res.render('home', {
                        name: userName,
                        table_key: table_key,
                        items: menu_results,
                        check_msg: check_msg,
                        errorMsg: errorMsg,
                        Date: date_key, 
                        Time: time_key
                    })

                } else {

                    return res.render('home', {
                        name: userName,
                        table_key: table_key,
                        items: menu_results,
                        check_items: table_results,
                        errorMsg: errorMsg,
                        Date: date_key, 
                        Time: time_key
                    })
                }
            })
        })
    }
}