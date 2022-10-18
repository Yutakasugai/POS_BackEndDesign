const db_conn = require("../db/db-conn"); 
const db = db_conn["db_conn"];

// Start btn functions
exports.startBtn = (req, res) => {

    const {adminName, data_key, time_key} = req.body; 

    // Create a table, order_result, due to the start btn
    const sql = `CREATE TABLE IF NOT EXISTS order_result 
    (id INT AUTO_INCREMENT PRIMARY KEY, table_name TEXT NOT NULL, EST TEXT DEFAULT "None", order_item TEXT NOT NULL)`; 
    
    // Create updated_table just in case if not exist 
    const upadted_sql = `CREATE TABLE IF NOT EXISTS updated_table 
    (id INT AUTO_INCREMENT PRIMARY KEY, table_name TEXT NOT NULL, table_id TEXT NOT NULL, EST TEXT DEFAULT "None", item_id TEXT NOT NULL)`; 

    // two tables will be created if not exist
    db.query(sql, (error) => {
        if(error){
            console.log(error)
        }
        console.log("Table, order_reult, created!"); 

        db.query(upadted_sql, (error) => {
            if(error){
                console.log(error)
            }

            console.log("updated_table created!"); 
        })
    })

    db.query("select name from users", (error, userList) => {
        if(error){
            console.log("This error is in users: " + error)
        }

        const nameList = get_userList(userList); 

        // Remove logged users from user list
        db.query("select name from userLog", (error, loggedUser) => {
            if(error){
                console.log("This error is in userLog: " + error)
            }
    
            const checkedList = check_userList(nameList, loggedUser); 

            db.query('SELECT * FROM order_result ORDER BY id DESC', (error, done_items) => {
                if (error) {
                    console.log(error); 
                }

                // Capture all values from updated_table as neeed 
                db.query(`select * from updated_table`, (error, main_result) => {
                    if(error) {
                        console.log(error); 
                    }

                    if (main_result.length > 0){

                        const temp_array = []; 

                        for (let i = 0; i < main_result.length; i++){

                            let box_id = main_result[i]['id']; 
                            let table_name = main_result[i]['table_name']; 
                            let table_id = main_result[i]['table_id']; 
                            let item_id = main_result[i]['item_id'].split(':').join(','); 
                            let EST_val = main_result[i]['EST']; 

                            //console.log(item_id); 

                            db.query(`select * from ${table_id} where id IN(${item_id})`, (error, test_result) => {
                                if(error){
                                    console.log(error); 
                                }

                                if (table_id.includes('Phone') === true) {

                                    let phone_order = `${table_name}#${EST_val}`; 

                                    if (test_result.length > 1) {

                                        let b = ''; 
        
                                        for (let j = 0; j < test_result.length; j++) {
        
                                            // console.log(test_result[j]['full_order']); 
                                            b = `${b}!${test_result[j]['full_order']}`; 
                                            
                                            if (j === (test_result.length -1)){
        
                                                b = `${box_id}!${phone_order}${b}`; 
                                                temp_array.push(b); 
                                            }
                                        }
        
                                    } else {
        
                                        let a = `${box_id}!${phone_order}!${test_result[0]['full_order']}`; 
                                        temp_array.push(a); 
                                    }

                                } else {

                                    if (test_result.length > 1) {

                                        let b = ''; 
        
                                        for (let j = 0; j < test_result.length; j++) {
        
                                            // console.log(test_result[j]['full_order']); 
                                            b = `${b}!${test_result[j]['full_order']}`; 
                                            
                                            if (j === (test_result.length -1)){
        
                                                b = `${box_id}!${table_name}${b}`; 
                                                temp_array.push(b); 
                                            }
                                        }
        
                                    } else {
        
                                        let a = `${box_id}!${table_name}!${test_result[0]['full_order']}`; 
                                        temp_array.push(a); 
                                    }
                                }

                                if (i === (main_result.length-1)){
                                    // console.log(temp_array); 

                                    //Jump to an admin page with table values
                                    return res.render("admin_main", {
                                        name: adminName, 
                                        date: data_key, 
                                        time: time_key,
                                        total_result: temp_array.join(','),
                                        nameList: checkedList,
                                        done_items: done_items
                                    })
                                }
                            })
                        }

                    } else {

                        //Jump to an admin page with table values
                        return res.render("admin_main", {
                            name: adminName, 
                            date: data_key, 
                            time: time_key,
                            nameList: checkedList,
                            done_items: done_items
                        })
                    }
                })
            })
        })
    })
}

function get_userList(userList) {

    const nameList = []
    const result = Object.values(JSON.parse(JSON.stringify(userList)));

    for(let i = 0; i < userList.length; i ++){
        let temp_value = result[i]['name']
        nameList[i] = temp_value
    }

    return nameList; 
}

function check_userList(nameList, loggedUser) {

    const result_log = Object.values(JSON.parse(JSON.stringify(loggedUser)));

    if (loggedUser.length > 0) {

        for (let x = 0; x < loggedUser.length; x++){

            let checkedUser = result_log[x]['name']
            nameList.splice(nameList.indexOf(checkedUser), 1) 
        }

        return nameList; 
    } else {

        console.log("No user in userLog..."); 
        return nameList; 
    }
}

function table_button(db_result) {

    const exist_table = []
    const check_array = ['Table_1', 'Table_2', 'Table_3', 'Table_4', 'Table_5', 'Table_6', 'Table_7', 'Table_8']; 

    for (let i = 0; i < db_result.length; i++) {

        for (let t = 0; t < check_array.length; t++){

            if(db_result[i]['Tables_in_pos_database'] === check_array[t]){

                exist_table[check_array[t]] = 'order_taken';  
            } 
        }
    }  

    return exist_table; 
}

function get_orderResult(test_result) {

    const order_array = []
                    
    for (let j = 0; j < test_result.length; j++){

        if (test_result[j]['order_status'] === 'True'){
            const table_name = `Extra: ${test_result[j]['order_from']}`
            order_array.push(table_name);
        
        } else {
            const table_name = test_result[j]['order_from']; 
            order_array.push(table_name); 
        
        }
    }

    // Check if the order_array is long enough
    if (order_array.length <= 9) {

        for (let j = order_array.length; j <= 9; j++) {
            order_array.push('none'); 
        }

        return order_array; 
    } else {
        
        return order_array; 
    }
}

function get_itemPaper(test_result){

    const item_array = []; 

    for (let k = 0; k < test_result.length; k++){  

        //console.log(test_result[k]['Items'].split(','));  
        item_array.push(test_result[k]['order_items'].split(',')); 
    }

    // Check if the order_array is long enough
    if (item_array.length <= 9) {

        for (let j = item_array.length; j <= 9; j++) {
            item_array.push('none'); 
        }
        return item_array; 

    } else {
        return item_array; 

    }
}

function get_boxId(test_result) {

    const showBox_id = []; 

    for (let p = 0; p < test_result.length; p++){  

        showBox_id.push(test_result[p]['id']); 
    }

    // Check if the order_array is long enough
    if (showBox_id.length <= 9) {

        for (let l = showBox_id.length; l <= 9; l++) {
            showBox_id.push('none'); 
        }
        return showBox_id; 

    } else {
        return showBox_id; 

    }
}

function existTable_num(data_result) {

    if (data_result.length > 4) {

        return subBox_num = data_result.length - 4;
        
    } else {

        return subBox_num = 0; 

    }
}
