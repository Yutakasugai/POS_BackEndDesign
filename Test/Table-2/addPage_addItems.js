const url = require("url");
const db_conn = require("../../../db/db-conn"); 
const db = db_conn["db_conn"];

// Add function - by clicking add button, this function will enable to insert items into table-1 database
exports.addItem_2 = (req, res) => {

    const {select_item, table_key, userName} = req.body; 

    var temp_list = select_item;

    if(typeof(temp_list) === 'string'){
        let test_val = Object(temp_list).split(",")

        // console.log(test_val[0], test_val[1])

        db.query('INSERT INTO table_2(item_name, item_price) VALUES (?, ?)', [test_val[0], test_val[1]], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log("Added sucessfully")
        })

        res.redirect(url.format({
            pathname: '/auth/user/addPage',
            query: {
                "page": "added items on the data",
                "user": userName,
                "table_id": table_key
            }
        }))
        
    } else if (typeof(temp_list) === 'object'){
        
        for (let x = 0; x < (temp_list.length); x++){

            let item_list = temp_list[x].split(",");
        
            db.query('INSERT INTO table_2(item_name, item_price) VALUES (?, ?)', [item_list[0], item_list[1]], (error, results) => {
                if(error){
                    console.log(error)
                }
                console.log("Added sucessfully")
            })
        }

        res.redirect(url.format({
            pathname: '/auth/user/addPage',
            query: {
                "page": "added items on the data",
                "user": userName,
                "table_id": table_key
            }
        }))

    } else {

        db.query('SELECT * FROM menu_list', (error, menu_results) => {
            if(error){
                console.log(error)
            } 

            errorMsg = "No items selected"

            db.query('SELECT * FROM table_2', (error, table_results) => {
                if(error){
                    console.log(error)
                }

                if(table_results.length === 0){

                    check_msg = "No items added yet..."

                    res.render('home', {
                        name: userName,
                        table_key: table_key,
                        items: menu_results,
                        check_msg: check_msg,
                        errorMsg: errorMsg
                    })

                } else {

                    res.render('home', {
                        name: userName,
                        table_key: table_key,
                        items: menu_results,
                        check_items: table_results,
                        errorMsg: errorMsg
                    })
                }
            })
        })
    }
}