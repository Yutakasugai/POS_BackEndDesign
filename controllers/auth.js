const mysql = require("mysql"); 

// The library to turn user password into random number and character in all order to secure the password
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcryptjs");

// The library to enable me to redirect to another url 
const url = require("url");

const { resolveSoa } = require("dns");
const { count } = require("console");

// Create connection to database 
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

// Users login system to check if user type their correct password and username
exports.user = (req, res) => {
    
    const {name, password} = req.body; 

    db.query('SELECT * FROM users WHERE name = ? and password = ?', [name, password], (error, results) => {
        if(error){
            console.log(error)
        }
        if(results.length == 0){
            console.log(results)
            return res.render('index', {
                message: "Error! Please try again..."
            })
        }else {

            db.query('SELECT * FROM table_1', (error_1, result_1) => {
                if(error_1){
                    console.log(error_1);
                }
    
                var updateMsg = 'Order taken!'
                var check_1, check_2; 
                
                if(result_1.length > 0) {
                    check_1 = updateMsg
    
                    db.query('SELECT * FROM table_2', (error_2, result_2) => {
                        if(error_2){
                            console.log(error_2);
                        }
    
                        if(result_2.length > 0){
                            check_2 = updateMsg
                            res.render("server", {
                                name: name,
                                check_1: check_1, 
                                check_2: check_2
                            })
                        } else {
                            res.render("server", {
                                name: name, 
                                check_1: check_1
                            })
                        }
                    })
    
                } else {
                    db.query('SELECT * FROM table_2', (error_2, result_2) => {
                        if(error_2){
                            console.log(error_2);
                        }
    
                        if(result_2.length > 0){
                            check_2 = updateMsg
                            res.render("server", {
                                name: name, 
                                check_2: check_2
                            })
                        } else {
                            res.render("server", {
                                name: name
                            })
                        }
                    })
                }
            })
        }
    })    
}

// admin login system to check if admin type their correct password and username
exports.admin = (req, res) => {
    
    const {name, password} = req.body; 

    db.query('SELECT * FROM admin WHERE adminName = ? and adminPassword = ?', [name, password], (error, results) =>{
        if(error){
            console.log(error)
        }
        if(results.length == 0){
            console.log(results);
            return res.render('index', {
                message: 'Error! Please try again...'
            })
        }else {
            res.render('admin', {
                name: name
            })
        }
    })
}

// If user update for table 1, this exports will take user to update-1 page
exports.update_1 = (req, res) => {

    const {update_1, userName} = req.body; 

    db.query('SELECT * FROM menu_list', (error, results) => {
        if(error){
            console.log(error)
        } 
        res.render('home', {
            name: userName, 
            table_key: update_1,
            items: results
        })
    })
}

// If user update for table 2, this exports will take user to update-2 page
exports.update_2 = (req, res) => {

    const {update_2, userName} = req.body; 

    db.query('SELECT * FROM menu_list', (error, results) => {
        if(error){
            console.log(error)
        } 
        res.render('home', {
            name: userName, 
            table_key: update_2,
            items: results
        })
    })
}

// Add function - by clicking add button, this function will enable to insert items into table-1 database
exports.addItem_1 = (req, res) => {

    const {select_item, table_key, userName} = req.body; 

    var temp_list = select_item;

    var check_counter = 0; 

    if(typeof(temp_list) === 'string'){
        let test_val = Object(temp_list).split(",")

        console.log(test_val[0], test_val[1])

        db.query('INSERT INTO table_1(item_name, item_price) VALUES (?, ?)', [test_val[0], test_val[1]], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log("Added sucessfully")
        })

        check_counter = 1
        
    } else if (typeof(temp_list) === 'object'){
        for (let x = 0; x < (temp_list.length); x++){

            let item_list = temp_list[x].split(",");
        
            db.query('INSERT INTO table_1(item_name, item_price) VALUES (?, ?)', [item_list[0], item_list[1]], (error, results) => {
                if(error){
                    console.log(error)
                }
                console.log("Added sucessfully")
            })
        }

        check_counter = 1

    } else {
        db.query('SELECT * FROM menu_list', (error, results) => {
            if(error){
                console.log(error)
            } 

            errorMsg = "No items selected"

            res.render('home', {
                name: userName,
                table_key: table_key,
                items: results,
                errorMsg: errorMsg
            })
        })
    }

    if(check_counter !== 0) {
        res.redirect(url.format({
            pathname: '/auth/user/home',
            query: {
                "page": "server's main page",
                "user": userName
            }
        }))
    }
}

// Add function - by clicking add button, this function will enable to insert items into table-2 database
exports.addItem_2 = (req, res) => {

    const {select_item, table_key, userName} = req.body; 

    var temp_list = select_item

    var check_counter = 0

    if(typeof(temp_list) === 'string'){
        let test_val = Object(temp_list).split(",")

        console.log(test_val[0], test_val[1])

        db.query('INSERT INTO table_2(item_name, item_price) VALUES (?, ?)', [test_val[0], test_val[1]], (error, results) => {
            if(error){
                console.log(error)
            }
            console.log("Added sucessfully")
        })

        check_counter = 1
        
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

        check_counter = 1

    } else {
        db.query('SELECT * FROM menu_list', (error, results) => {
            if(error){
                console.log(error)
            } 

            errorMsg = "No items selected"

            res.render('home', {
                name: userName, 
                table_key: table_key, 
                items: results,
                errorMsg: errorMsg
            })
        })
    }

    if(check_counter !== 0) {
        res.redirect(url.format({
            pathname: '/auth/user/home',
            query: {
                "page": "server's main page",
                "user": userName
            }
        }))
    }
}

// If user view the order list for table 1, this exports will take user to view page for table 1
exports.viewItem_1 = (req, res) => {

    const {view_1, userName} = req.body;

    // console.log("Here is view: " + test)

    db.query('SELECT * FROM table_1', (error, table_results) => {
        if(error){
            console.log(error)
        } 

        noItem_msg = "No items found on this order list..."

        if(table_results.length === 0){
            res.render('edit', {
                name: userName, 
                table_key: view_1,
                items: table_results,
                noItem_msg: noItem_msg
            })
        } else {
            res.render('edit', {
                name: userName, 
                table_key: view_1,
                items: table_results
            })
        }
    })
}

// If user view the order list for table 2, this exports will take user to view page for table 2
exports.viewItem_2 = (req, res) => {

    const {view_2, userName} = req.body;

    db.query('SELECT * FROM table_2', (error, table_results) => {
        if(error){
            console.log(error)
        } 

        noItem_msg = "No items found on this order list..."

        if(table_results.length === 0){
            res.render('edit', {
                name: userName, 
                table_key: view_2,
                items: table_results,
                noItem_msg: noItem_msg
            })
        } else{
            res.render('edit', {
                name: userName, 
                table_key: view_2,
                items: table_results
            })
        }
    })
}

// Remove function - by clicking remove button in the view page, this will enable to remove items into table-1 database
// After deleting items from database, user will stay at this same page
exports.removeItem_1 = (req, res) => {
    const {remove_id, userName, table_key, resend_key} = req.body;

    if(typeof(remove_id) === 'string'){

        const temp_id = parseInt(remove_id)

        db.query('DELETE from table_1 WHERE ID = (?)', [temp_id], (error, results) => {
            if(error){
                console.log(error)
            } 
        })

        db.query('SELECT * FROM table_1', (error, table_results) => {
            if(error){
                console.log(error)
            } 

            resendMsg = "Please resned this list to confirm your change";

            res.render('edit', {
                resendMsg: resendMsg,
                resend_key: "Removed",
                name: userName, 
                table_key: table_key,
                items: table_results,
                removed_key: "Pass"
            })
        })

    } else if (typeof(remove_id) === 'object') {

        console.log(remove_id.length)

        for (let t = 0; t < (remove_id.length); t++) {
            // console.log(parseInt(remove_id[t]), typeof(remove_id[t]))

            let temp_id = parseInt(remove_id[t]);

            db.query('DELETE from table_1 WHERE ID = (?)', [temp_id], (error, results) => {
                if(error){
                    console.log(error)
                } 
            })
        }

        db.query('SELECT * FROM table_1', (error, table_results) => {
            if(error){
                console.log(error)
            } 

            resendMsg = "Please resned this list to confirm your change";

            res.render('edit', {
                resendMsg: resendMsg,
                resend_key: "Removed",
                name: userName, 
                table_key: table_key,
                items: table_results,
                removed_key: "Pass"
            })
        })

    } else {

        if (resend_key === "Removed"){
            
            db.query('SELECT * FROM table_1', (error, table_results) => {
                if(error){
                    console.log(error)
                } 
    
                errorMsg = "No items selected"
    
                res.render('edit', {
                    resend_key: "Removed",
                    name: userName, 
                    table_key: table_key,
                    items: table_results,
                    errorMsg: errorMsg,
                    removed_key2: "Pass"
                })
            })
        } else {

            db.query('SELECT * FROM table_1', (error, table_results) => {
                if(error){
                    console.log(error)
                } 
    
                nonremoved_msg = "No items selected"
    
                res.render('edit', {
                    name: userName, 
                    table_key: table_key,
                    items: table_results,
                    nonremoved_msg: nonremoved_msg
                })
            })
        }
    }
}

// Remove function - by clicking remove button in the view page, this will enable to remove items into table-2 database
// After deleting items from database, user will stay at this same page
exports.removeItem_2 = (req, res) => {
    const {remove_id, userName, table_key, resend_key_2} = req.body;

    if(typeof(remove_id) === 'string'){

        const temp_id = parseInt(remove_id)

        db.query('DELETE from table_2 WHERE ID = (?)', [temp_id], (error, results) => {
            if(error){
                console.log(error)
            } 
        })

        db.query('SELECT * FROM table_2', (error, table_results) => {
            if(error){
                console.log(error)
            } 

            resendMsg = "Please resned this list to confirm your change";

            res.render('edit', {
                resendMsg: resendMsg, 
                resend_key_2: "Removed",
                name: userName, 
                table_key: table_key,
                items: table_results,
                removed_key: "Pass"
            })
        })

    } else if (typeof(remove_id) === 'object') {

        console.log(remove_id.length)

        for (let t = 0; t < (remove_id.length); t++) {
            // console.log(parseInt(remove_id[t]), typeof(remove_id[t]))

            let temp_id = parseInt(remove_id[t]);

            db.query('DELETE from table_2 WHERE ID = (?)', [temp_id], (error, results) => {
                if(error){
                    console.log(error)
                } 
            })
        }

        db.query('SELECT * FROM table_2', (error, table_results) => {
            if(error){
                console.log(error)
            } 

            resendMsg = "Please resned this list to confirm your change";

            res.render('edit', {
                resendMsg: resendMsg,
                resend_key_2: "Removed",
                name: userName, 
                table_key: table_key,
                items: table_results,
                removed_key: "Pass"
            })
        })

    } else {

        if (resend_key_2 === "Removed"){
            
            db.query('SELECT * FROM table_2', (error, table_results) => {
                if(error){
                    console.log(error)
                } 
    
                errorMsg = "No items selected"
    
                res.render('edit', {
                    resend_key_2: "Removed",
                    name: userName, 
                    table_key: table_key,
                    items: table_results,
                    errorMsg: errorMsg,
                    removed_key2: "Pass"
                })
            })
        } else {

            db.query('SELECT * FROM table_2', (error, table_results) => {
                if(error){
                    console.log(error)
                } 
    
                nonremoved_msg = "No items selected"
    
                res.render('edit', {
                    name: userName, 
                    table_key: table_key,
                    items: table_results,
                    nonremoved_msg: nonremoved_msg
                })
            })
        }
    }

}

// Resend function to push any changes on the table1 orders in the kitchen 
exports.resendItem_1 = (req, res) => {

    const {userName} = req.body; 

    res.redirect(url.format({
        pathname: '/auth/user/home',
        query: {
            "page": "server's main page",
            "user": userName
        }
    }))
}

// Resend function to push any changes on the table2 orders in the kitchen
exports.resendItem_2 = (req, res) => {

    const {userName} = req.body; 

    res.redirect(url.format({
        pathname: '/auth/user/home',
        query: {
            "page": "server's main page",
            "user": userName
        }
    }))

}

// Back button to function leading users to back to the main page 
exports.backBtn_1 = (req, res) => {
    const {userName} = req.body; 

    res.redirect(url.format({
        pathname: '/auth/user/home',
        query: {
            "page": "server's main page",
            "user": userName
        }
    }))
}

// Back button to function leading users to back to the main page
exports.backBtn_2 = (req, res) => {
    const {userName} = req.body; 

    res.redirect(url.format({
        pathname: '/auth/user/home',
        query: {
            "page": "server's main page",
            "user": userName
        }
    }))
}
