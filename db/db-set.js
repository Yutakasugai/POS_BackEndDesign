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
    // db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, password TEXT NOT NULL)", (error) => {
    //     if(error){
    //         console.log(error)
    //     }

    //     // console.log("Table created!")

    //     db.query("select * from users", (error, results) => {
    //         if(results.length > 0){

    //             console.log("The users table already have a value")

    //         } else {

    //             db.query("INSERT INTO users (name, password) VALUES ('Yuta', '123'), ('Koya', '123'), ('Tom', '123')", (error) => {
    //                 if(error){
    //                     console.log(error)
    //                 }
            
    //                 console.log("Test values inserted into the users table!")
    //             })
    //         }
            
    //     })
    // })

    // Check if there is a table for admin or not 
    // db.query("CREATE TABLE IF NOT EXISTS admin (id INT AUTO_INCREMENT PRIMARY KEY, admin_name TEXT NOT NULL, admin_password TEXT NOT NULL)", (error) => {
    //     if(error){
    //         console.log(error)
    //     }

    //     // console.log("Table created!")

    //     db.query("select * from admin", (error, results) => {
    //         if(results.length > 0){

    //             console.log("The admin table already have a value")

    //         } else {

    //             db.query("INSERT INTO admin (admin_name, admin_password) VALUES ('Yoshi', '123'), ('John', '123')", (error) => {
    //                 if(error){
    //                     console.log(error)
    //                 }
            
    //                 console.log("Test values inserted into the admin table!")
    //             })
    //         }
            
    //     })
    // })

    // Check if there is a table called userLog
    db.query("CREATE TABLE IF NOT EXISTS userLog (name TEXT NOT NULL, startTime TEXT)", (error) => {
        if(error){
            console.log(error)
        }
    })

    // Check if there is a table called adminLog
    db.query("CREATE TABLE IF NOT EXISTS adminLog (admin_name TEXT NOT NULL, admin_startTime TEXT NOT NULL)", (error) => {
        if(error){
            console.log(error)
        }
    })

    // Create togo_phone table auto 
    db.query('CREATE TABLE IF NOT EXISTS togo_phone (order_status TEXT NOT NULL, table_id TEXT NOT NULL, table_status TEXT DEFAULT "empty", num_customer TEXT DEFAULT "1")', (error) => {
        if (error) {
            console.log(error); 
        }
    })

    console.log("userLog, adminLog, togo_phone tables are created!"); 
})
