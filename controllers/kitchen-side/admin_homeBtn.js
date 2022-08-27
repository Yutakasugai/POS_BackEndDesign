const url = require("url");

// home btn function 
exports.homeBtn = (req, res) => {

    const {adminName, data_key, time_key} = req.body; 

    res.redirect(url.format({
        pathname: "/auth/admin/home",
        query: {
            page: "admin's home page",
            admin: adminName,
            data: data_key, 
            time: time_key
            }
        })
    );
}