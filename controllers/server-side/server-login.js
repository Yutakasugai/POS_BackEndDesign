const url = require("url");
const db_conn = require("../../db/db-conn"); 
const db = db_conn["db_conn"];

exports.user = (req, res) => {

    const {user_name} = req.body
    const startTime = new Date(); 
    const dataList = getData(startTime); 
    let date_key = dataList[0];
    let time_key = dataList[1];

    // Insert a name and starttime in userLog table
    db.query("INSERT INTO userLog(name, startTime) VALUES (?, ?)", [user_name, startTime], (error) => {
        if(error){
            console.log(error); 
        }

        // Go back to server main page
        return res.redirect(url.format({
            pathname: '/serverHome',
            query: {
                "status": "Server_HomePage",
                "user": user_name,
                "date": date_key, 
                "time": time_key, 
            }
        }))
    })  
}

function getData(startTime) {

    const data_array = []

    if (startTime.getDay() === 0){

        const today = "Sunday";
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 1){

        const today = "Monday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 2){

        const today = "Tuesday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 3){

        const today = "Wednesday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 4){

        const today = "Thursday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 5){

        const today = "Friday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else if (startTime.getDay() === 6){

        const today = "Saturday"
        const cur_date = `${(startTime.getMonth()+1)}-${(startTime.getDate())} (${today})`; 

        if (startTime.getHours() >= 16 && startTime.getHours() <= 23) {
            const work_time = "Night"
            data_array.push(cur_date, work_time); 

        } else {
            const work_time = "Lunch"; 
            data_array.push(cur_date, work_time);
        } 

        return data_array; 

    } else {
        console.log("Errors! I cant get a correct date number..."); 
        return "Error"; 
    }
}
