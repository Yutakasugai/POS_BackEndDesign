const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// User logout 
exports.signOut = (req, res) => {

    const {userName, date_key, time_key} = req.body; 

    // Count the current number of servers
    db.query(`select * from users where user_status = 'True' and name != (?)`, (userName), (error, check_user) => {
        if (error) {
            console.log(error); 
        }

        if (check_user.length > 0) {

            console.log('There is still another server on the sytem!');
            
            // Update useer_status
            db.query(`UPDATE users SET user_status = 'False' WHERE name = (?)`, (userName), (error) => {
                if(error) {
                    console.log(error); 
                }
                    res.redirect(url.format({
                    pathname: '/signout',
                    query: {
                        "status": "Sign Out",
                        "user": userName
                    }
                }))
            })

        } else {

            console.log('Please finish this business first!'); 

            // Back to serverHome again 
            return res.redirect(url.format({
                pathname: '/serverHome',
                query: {
                    "status": "Server_HomePage",
                    "user": userName,
                    "date": date_key, 
                    "time": time_key
                }
            }))
        }
    })
}