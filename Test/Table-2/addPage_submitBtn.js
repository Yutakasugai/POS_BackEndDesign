const url = require("url");
const db_conn = require("../../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.submit_2 = (req, res) => {

    console.log("Here is controller site for submitBtn");

    const {userName} = req.body; 

    res.redirect(url.format({
        pathname: '/auth/user/home',
        query: {
            "page": "server's main page",
            "user": userName
        }
    }))
}