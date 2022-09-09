const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.user = (req, res) => {

    const {user_name} = req.body
    const startTime = new Date(); 
    const dataList = getData(startTime); 
    let data_key = dataList[0];
    let time_key = dataList[1];

    // Once the server can be logged in successfuly, a new table will be crated 
    // const initial_sql = `CREATE TABLE IF NOT EXISTS table_record
    // (id INT AUTO_INCREMENT PRIMARY KEY, order_from TEXT NOT NULL, c_number INTEGER, order_status TEXT, created_at TEXT NOT NULL, customer_name TEXT, EST TEXT, order_items TEXT)`; 

    // db.query(initial_sql, (error) => {
    //     if(error){
    //         console.log(error)
    //     }
    //     console.log("table_record is just created!"); 
    // })

    // Insert a name and starttime in userLog table
    db.query("select name from userLog where name = (?)", (user_name), (error, result) => {
        if (error){
            console.log(error)
        }

        if (result.length > 0) {

            console.log("Not need to insert this value to db"); 

            // Make an array conatined of table_status
            db.query("select table_status from table_check", (error, result) => {
                if (error) {
                    console.log(error)
                }

                // Create table array for a next page
                const table_arr = []
                for (let l = 0; l < result.length; l++) {

                    table_arr.push(result[l]["table_status"]); 
                }

                console.log(table_arr); 

                return res.render("server", {
                    name: user_name, 
                    Date: data_key, 
                    Time: time_key,
                    table_arr: table_arr
                })
            })

        } else {

            db.query("INSERT INTO userLog(name, startTime) VALUES (?, ?)", [user_name, startTime], (error) => {
                if(error){
                    console.log(error); 
                }
            })  
            
            // Make an array conatined of table_status
            db.query("select table_status from table_check", (error, result) => {
                if (error) {
                    console.log(error)
                }

                // Create table array for a next page
                const table_arr = []
                for (let l = 0; l < result.length; l++) {

                    table_arr.push(result[l]["table_status"]); 
                }

                console.log(table_arr); 

                return res.render("server", {
                    name: user_name, 
                    Date: data_key, 
                    Time: time_key,
                    table_arr: table_arr
                })
            })

        }
    })
}

function getData(startTime) {

    const data_array = []

    if (startTime.getDay() === 0){

        const today = "Sunday";
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 1){

        const today = "Monday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 2){

        const today = "Tuesday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 3){

        const today = "Wednesday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 4){

        const today = "Thursday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 5){

        const today = "Friday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 6){

        const today = "Saturday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else {
        console.log("Errors! I cant get a correct date number..."); 
        return "Error"; 
    }
}

// function table_button(db_result) {

//     const exist_table = []
//     const check_array = ['Table_1', 'Table_2', 'Table_3', 'Table_4', 'Table_5', 'Table_6', 'Table_7', 'Table_8', 'Togo_1', 'Togo_2', 'Togo_3', 'Togo_4', 'Phone_1', 'Phone_2', 'Phone_3', 'Phone_4']; 

//     for (let i = 0; i < db_result.length; i++) {

//         for (let t = 0; t < check_array.length; t++){

//             if(db_result[i]['Tables_in_pos_database'] === check_array[t]){
 
//                 exist_table.push(check_array[t]); 
//             } 
//         }
//     }  

//     return exist_table; 
// }

