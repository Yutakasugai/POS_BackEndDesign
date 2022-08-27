const db_conn = require("./db-conn"); 
const db = db_conn["db_conn"]; 

// Check if the connection is created or not 
db.connect((error) => {
    if(error){
        // throw err;
        console.log(error)
    }

    console.log("MySql connected!"); 

    // Check if there is a table for user or not 
    db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, password TEXT NOT NULL)", (error) => {
        if(error){
            console.log(error)
        }

        // console.log("Table created!")

        db.query("select * from users", (error, results) => {
            if(results.length > 0){

                console.log("The users table already have a value")

            } else {

                db.query("INSERT INTO users (name, password) VALUES ('Yuta', '123'), ('Koya', '123'), ('Tom', '123')", (error) => {
                    if(error){
                        console.log(error)
                    }
            
                    console.log("Test values inserted into the users table!")
                })
            }
            
        })
    })

    // Check if there is a table for admin or not 
    db.query("CREATE TABLE IF NOT EXISTS admin (id INT AUTO_INCREMENT PRIMARY KEY, admin_name TEXT NOT NULL, admin_password TEXT NOT NULL)", (error) => {
        if(error){
            console.log(error)
        }

        // console.log("Table created!")

        db.query("select * from admin", (error, results) => {
            if(results.length > 0){

                console.log("The admin table already have a value")

            } else {

                db.query("INSERT INTO admin (admin_name, admin_password) VALUES ('Yoshi', '123'), ('John', '123')", (error) => {
                    if(error){
                        console.log(error)
                    }
            
                    console.log("Test values inserted into the admin table!")
                })
            }
            
        })
    })

    // Check if there is a table for menu_list 
    db.query("CREATE TABLE IF NOT EXISTS menu_list (id INT AUTO_INCREMENT PRIMARY KEY, item TEXT NOT NULL, price TEXT NOT NULL)", (error) => {
        if(error){
            console.log(error)
        }

        // console.log("Table, menu_list, created!")

        db.query("select * from menu_list", (error, results) => {
            if(results.length > 0){

                console.log("The menu_list table already have a value")

            } else {

                db.query("INSERT INTO menu_list (item, price) VALUES ('Miso', '13.00'), ('Shio', '12.45'), ('Shoyu', '12.45'), ('Gyoza', '5.00')", (error) => {
                    if(error){
                        console.log(error)
                    }
            
                    console.log("Test values inserted into the menu_list table!")
                })
            }
            
        })
    })

    // Check if there is a table called table_1
    // db.query("CREATE TABLE IF NOT EXISTS Table_1 (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_price TEXT NOT NULL)", (error) => {
    //     if(error){
    //         console.log(error)
    //     }

    //     console.log("Table, table_1, created!")
    // })

    // Check if there is a table called table_2
    // db.query("CREATE TABLE IF NOT EXISTS Table_2 (id INT AUTO_INCREMENT PRIMARY KEY, item_name TEXT NOT NULL, item_price TEXT NOT NULL)", (error) => {
    //     if(error){
    //         console.log(error)
    //     }

    //     console.log("Table, table_2, created!")
    // })

    // Check if there is a table called userLog
    db.query("CREATE TABLE IF NOT EXISTS userLog (name TEXT NOT NULL, startTime TEXT)", (error) => {
        if(error){
            console.log(error)
        }

        console.log("Table, userLog, created!")
    })

    // Check if there is a table called adminLog
    db.query("CREATE TABLE IF NOT EXISTS adminLog (admin_name TEXT NOT NULL, admin_startTime TEXT NOT NULL)", (error) => {
        if(error){
            console.log(error)
        }

        console.log("Table, adminLog, created!"); 
    })
})
