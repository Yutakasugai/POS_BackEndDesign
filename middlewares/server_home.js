// Create a midddleware to secure the URL which prevents anyone from having an easy access to the page 
module.exports = function () {
    
    return function (req, res, next) {

        // const name_key = req.query.user; 

        if(req.query.page === "server's main page" && req.query.user && req.query.date && req.query.time){
            next()

        } else {
            res.redirect("/")
        }
    }
}