// Create a midddleware to secure the URL which prevents anyone from having an easy access to the page 
module.exports = function () {
    
    return function (req, res, next) {

        const name_key = req.query.user;
    
        if (req.query.status === "Time Out" && req.query.user === name_key){
            next()

        } else if (req.query.status === "Sign Out" && req.query.user === name_key){
            next()

        } else if (req.query.status === "Admin Pass"){
            next()
            
        } else {
            res.redirect("/")
        }
    }
}