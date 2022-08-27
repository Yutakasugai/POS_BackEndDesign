// This middleware works after admin add a new user, which leading them to admin Home page
module.exports = function () {
    
    return function (req, res, next) {

        const name_key = req.query.admin;

        if(req.query.page === "admin's home page" && req.query.admin === name_key){
            next()

        } else {
            res.redirect("/")
        }
    }
}