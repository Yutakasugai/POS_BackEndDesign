const url = require("url");

exports.submit_1 = (req, res) => {

    console.log("Here is controller site for submitBtn");

    const {userName, date_key, time_key} = req.body; 

    res.redirect(url.format({
        pathname: '/auth/user/home',
        query: {
            "page": "server's main page",
            "user": userName,
            "date": date_key,
            "time": time_key
        }
    }))
}