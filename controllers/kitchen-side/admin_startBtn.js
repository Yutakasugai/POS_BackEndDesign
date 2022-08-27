const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Start btn functions
exports.startBtn = (req, res) => {

    const {adminName, data_key, time_key} = req.body; 

    // Create a table, order_result, due to the start btn
    const sql = `CREATE TABLE IF NOT EXISTS order_result 
    (id INT AUTO_INCREMENT PRIMARY KEY, table_name TEXT NOT NULL,table_id TEXT NOT NULL, order_status TEXT, created_time TEXT NOT NULL, customer_name TEXT, order_items TEXT NOT NULL)`; 
    
    // Create updated_table just in case if not exist 
    const upadted_sql = `CREATE TABLE IF NOT EXISTS updated_table 
    (id INT AUTO_INCREMENT PRIMARY KEY, order_from TEXT NOT NULL, c_number INTEGER, order_status TEXT, created_at TEXT NOT NULL, customer_name TEXT, EST TEXT, order_items TEXT)`; 

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

            // Check table status
            db.query('show tables', (error, result) => {
                if(error){
                    console.log(error)
                }

                // Check all table from 1-8 which table is filled
                const table_result = table_button(result); 

                db.query(`select * from updated_table`, (error, test_result) => {
                    if(error){
                        console.log(error)
                    }

                    const order_paper = get_orderResult(test_result); 
                    const item_array = get_itemPaper(test_result); 
                    const showBox_id = get_boxId(test_result);

                    db.query('select * from order_result', (error, view_result) => {
                        if(error){
                            console.log(error)
                        }

                        // Jump to an admin page with table values
                        return res.render("admin_main", {
                            name: adminName, 
                            date: data_key, 
                            time: time_key,
                            nameList: checkedList,
                            subBox_num: existTable_num(test_result), 
                            done_items: view_result,

                            Table_1: table_result['Table_1'],
                            Table_2: table_result['Table_2'],
                            Table_3: table_result['Table_3'],
                            Table_4: table_result['Table_4'],
                            Table_5: table_result['Table_5'],
                            Table_6: table_result['Table_6'],
                            Table_7: table_result['Table_7'],
                            Table_8: table_result['Table_8'],

                            Box_1: order_paper[0], 
                            Box1_Item: item_array[0],
                            Box1_ID: showBox_id[0],

                            Box_2: order_paper[1], 
                            Box2_Item: item_array[1],
                            Box2_ID: showBox_id[1],

                            Box_3: order_paper[2], 
                            Box3_Item: item_array[2],
                            Box3_ID: showBox_id[2],

                            Box_4: order_paper[3],
                            Box4_Item: item_array[3],
                            Box4_ID: showBox_id[3],

                            Box_5: order_paper[4],
                            Box5_Item: item_array[4],
                            Box5_ID: showBox_id[4],

                            Box_6: order_paper[5],
                            Box6_Item: item_array[5],
                            Box6_ID: showBox_id[5],

                            Box_7: order_paper[6],
                            Box7_Item: item_array[6],
                            Box7_ID: showBox_id[6],

                            Box_8: order_paper[7],
                            Box8_Item: item_array[7],
                            Box8_ID: showBox_id[7],

                            Box_9: order_paper[8],
                            Box9_Item: item_array[8],
                            Box9_ID: showBox_id[8],

                            Box_10: order_paper[9],
                            Box10_Item: item_array[9],
                            Box10_ID: showBox_id[9],
                        })
                    })
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
