const url = require("url");

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