const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// User logout 
exports.signout_user = (req, res) => {

    const {userName} = req.body; 

    console.log("Remove this user from userLog to sign out")

    db.query("delete from userLog where name = (?)", (userName), (error) => {
        if(error){
            console.log("error")
        }

        console.log("Succesfully remove this user")

        res.redirect(url.format({
            pathname: '/signout',
            query: {
                "status": "Sign Out",
                "user": userName
            }
        }))
    })
}