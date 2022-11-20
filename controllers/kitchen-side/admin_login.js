const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// admin login system to check if admin type their correct password and username
exports.admin = (req, res) => {

    const {admin_name, admin_password} = req.body;

    // console.log(admin_name, admin_password); 

    const startTime = new Date(); 
    const dataList = getData(startTime); 
    let data_key = dataList[0];
    let time_key = dataList[1]; 

    // Check if other admins are in aactive or not 
    db.query(`select * from admin where admin_status = 'True'`, (error, admin_con) => {
        if (error) {
            console.log(error); 
        } 

        if (admin_con.length > 0) {
            /// console.log('Another admin is not in work, so only one admin is allowed to enter'); 

            // Back to page with error msg
            return res.redirect(url.format({
                pathname: '/signout',
                query: {
                    "user": admin_name,
                    "status": 'Check Log Admin'
                }
            })) 

        } else {
            // console.log('No other admin now, youre good to login for kitchen...'); 

            db.query('SELECT * FROM admin WHERE admin_name = (?) AND admin_password = (?)', [admin_name, admin_password], (error, admin_result) =>{
                if(error){
                    console.log(error)
                }
        
                if (admin_result.length > 0) {
        
                    console.log('The username and password was passed'); 
        
                    if (admin_result[0]['admin_status'] === 'True') {
        
                        console.log('This admin is already logged in...'); 
        
                        // Back to page with error msg
                        return res.redirect(url.format({
                            pathname: '/signout',
                            query: {
                                "user": admin_name,
                                "status": 'Check Log'
                            }
                        })) 
        
                    } else {
        
                        // console.log('This user is good to enter!');
        
                        // Create order_result db
                        db.query(`CREATE TABLE IF NOT EXISTS order_result (id INT AUTO_INCREMENT PRIMARY KEY, table_name TEXT NOT NULL, EST TEXT DEFAULT "None", order_item TEXT NOT NULL)`); 
                        
                        // Create updated_table db
                        db.query(`CREATE TABLE IF NOT EXISTS updated_table (id INT AUTO_INCREMENT PRIMARY KEY, table_name TEXT NOT NULL, table_id TEXT NOT NULL, EST TEXT DEFAULT "None", item_id TEXT NOT NULL)`); 
        
                        // Create togo_phone db
                        db.query('CREATE TABLE IF NOT EXISTS togo_phone (order_status TEXT NOT NULL, table_id TEXT NOT NULL, table_status TEXT DEFAULT "empty", EST TEXT DEFAULT "None", num_customer TEXT DEFAULT "1")'); 
        
                        // Create coming_order db 
                        db.query('CREATE TABLE IF NOT EXISTS coming_order(id INT AUTO_INCREMENT PRIMARY KEY, table_id TEXT NOT NULL, item_name TEXT NOT NULL, original_id TEXT NOT NULL, kitchen_id TEXT)')
        
                        // Create customer_result db 
                        db.query('CREATE TABLE IF NOT EXISTS customer_result (id INT AUTO_INCREMENT PRIMARY KEY, table_id TEXT NOT NULL, num_customer TEXT NOT NULL)'); 

                        // Create done_order db
                        db.query(`CREATE TABLE IF NOT EXISTS done_order (id INT AUTO_INCREMENT PRIMARY KEY, table_id TEXT NOT NULL, item_name TEXT NOT NULL)`); 
        
                        // Update the admin db 
                        db.query(`update admin set admin_status = 'True' where admin_name = (?)`, (admin_name), (error) => {
                            if (error) {
                                console.log(error); 
                            }
        
                            return res.redirect(url.format({
                                pathname: '/adminMain',
                                query: {
                                    "admin": admin_name,
                                    "date": data_key, 
                                    "time": time_key
                                }
                            })) 
                        })
                    }
        
                } else {
        
                    console.log('The password or username is wrong'); 
        
                    // Back to page with error msg
                    return res.redirect(url.format({
                        pathname: '/signout',
                        query: {
                            "user": admin_name, 
                            "status": 'Check Name or Pass'
                        }
                    })) 
                }
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
            const work_time = "Night" //<- here should be night, just testing
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
