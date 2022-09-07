// View Page Controller
exports.viewPage = (req, res) => {

    console.log("This will take a user to View Page!"); 

    const {userName, date_key, time_key, table_key, c_number} = req.body; 
    //console.log(userName, date_key, time_key, table_key, c_number); 

    // Just test to return a addpage on the window
    return res.render("serverView", {
        name: userName, 
        Date: date_key, 
        Time: time_key,
        table_key: table_key, 
        c_number: c_number
    }); 
}