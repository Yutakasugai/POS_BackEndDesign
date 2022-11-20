const { error } = require("console");
const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

// Back Button on server close page
exports.closeBack = (req, res) => {

    const {userName, date_key, time_key} = req.body;

    // Go back to server home page 
    return res.redirect(url.format({
        pathname: '/serverHome',
        query: {
            "user": userName,
            "date": date_key, 
            "time": time_key
        }
    }))
}