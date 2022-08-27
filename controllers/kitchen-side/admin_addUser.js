const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.addUser = (req, res) => {

    const {adminName, data_key, time_key} = req.body; 

    db.query("select * from users", (error, results) => {
        if(error){
            console.log(error)
        }

        if (results.length > 0){

            console.log("Users exist on the database"); 

            res.render('addUser', {
                name: adminName, 
                data: data_key,
                time: time_key,
                users: results
            })
        } else {

            res.render('addUser', {
                name: adminName, 
                data: data_key,
                time: time_key, 
                msg: "No user found in the database..."
            })
        }
    })
}; 