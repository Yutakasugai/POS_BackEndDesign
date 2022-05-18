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

// Create a midddleware to secure the URL which prevents anyone from having an easy access to the page 
function userCheck(req, res, next) {

    console.log(req.originalUrl)

    const name_key = req.query.user; 

    if(req.query.page === "server's main page" && req.query.user === name_key){
        next()

    } else {
        res.redirect("/")
    }
}

module.exports = router; 

