const url = require("url");
// const db_conn = require("../../db/db-conn"); 
// const db = db_conn["db_conn"];

exports.updateTable = (req, res) => {

    const {userName, date_key, time_key} = req.body;

    return res.redirect(url.format({
        pathname: '/serverHome',
        query: {
            "status": "Server_HomePage",
            "user": userName,
            "date": date_key, 
            "time": time_key, 
        }
    }))
}


