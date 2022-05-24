const express = require("express"); 
const router = express.Router();

const mysql = require("mysql"); 

// Create connection to database 
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

router.get('/', (req, res) => {
    res.render("index");
})

router.get('/auth/user/home', userCheck, (req, res) => {

    const userName = req.query.user;

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
                        name: userName,
                        check_1: check_1, 
                        check_2: check_2
                    })
                } else {
                    res.render("server", {
                        name: userName,
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
                        name: userName, 
                        check_2: check_2
                    })
                } else {
                    res.render("server", {
                        name: userName
                    })
                }
            })
        }
    })
})

router.get('/auth/user/update_1', orderCheck_1, (req, res) => {

    const userName = req.query.user; 
    const table_key = req.query.table_id; 

    db.query("SELECT * FROM menu_list", (error, menu_results) => {
        if(error){
            console.log(error)
        }

        db.query("SELECT * FROM table_1", (error, table_results) => {
            if(error){
                console.log(error)
            }

            if(table_results.length === 0){

                console.log("No items added yet...")

                check_msg = "No items added yet..."

                res.render("home", {
                    name: userName, 
                    table_key: table_key, 
                    items: menu_results, 
                    check_msg: check_msg
                })
            } else {
                res.render("home", {
                    name: userName, 
                    table_key: table_key, 
                    items: menu_results, 
                    check_items: table_results
                })
            }
        })
    })
})

router.get('/auth/user/update_2', orderCheck_2, (req, res) => {

    const userName = req.query.user; 
    const table_key = req.query.table_id; 

    db.query("SELECT * FROM menu_list", (error, menu_results) => {
        if(error){
            console.log(error)
        }

        db.query("SELECT * FROM table_2", (error, table_results) => {
            if(error){
                console.log(error)
            }

            if(table_results.length === 0){

                console.log("No items added yet...")

                check_msg = "No items added yet..."

                res.render("home", {
                    name: userName, 
                    table_key: table_key, 
                    items: menu_results, 
                    check_msg: check_msg
                })
            } else {
                res.render("home", {
                    name: userName, 
                    table_key: table_key, 
                    items: menu_results, 
                    check_items: table_results
                })
            }
        })
    })
})

// Create a midddleware to secure the URL which prevents anyone from having an easy access to the page 
function userCheck(req, res, next) {

    // console.log(req.originalUrl)

    const name_key = req.query.user; 

    if(req.query.page === "server's main page" && req.query.user === name_key){
        next()

    } else {
        res.redirect("/")
    }
}

function orderCheck_1(req, res, next) {

    const name_key = req.query.user;
    const table_key = req.query.table_id; 

    if(req.query.page === "added items on the data" && req.query.user === name_key && req.query.table_id === table_key){
        next()

    } else {
        res.redirect("/")
    }
}

function orderCheck_2(req, res, next) {

    const name_key = req.query.user;
    const table_key = req.query.table_id; 

    if(req.query.page === "added items on the data" && req.query.user === name_key && req.query.table_id === table_key){
        next()

    } else {
        res.redirect("/")
    }
}

module.exports = router; 

